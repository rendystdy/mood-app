import { FlatList, View } from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Text } from '@components';

import style from './style';
import { Colors } from '@constant';
import { NotesInterface } from '@interfaces';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import dayjs from 'dayjs';
import { Actions } from '@store';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListOfNotes = () => {
	const listofnotes = useAppSelector(state => state.notesReducers.listofnotes);

	const removeItemNoteDispatch = useAppDispatch(Actions.notesAction.removeItemNote);
	const setUpdateNoteDispatch = useAppDispatch(Actions.notesAction.setUpdateNote);
	const rowRefs = new Map();

	const onPressEdit = (item: NotesInterface.INotes) => {

		if (item.isChecked) {
			return;
		}
		return NavigationHelper.push('CreateNote', { ...item, type: 'edit' });
	};

	const rightSwipeActions = () => {
		return (
			<View
				style={ style.wrapperDelete }
			>
				<IconsFontAwesome
					name='trash'
					size={ 24 }
					onPress={ () => NavigationHelper.pop(1) }
					color={ Colors.alert.red } />
			</View>
		);
	};

	const swipeFromRightOpen = (id: number) => {
		return removeItemNoteDispatch(id);
	};

	const renderItem = ({ item }: NotesInterface.ItemNote) => {
		return (
			<Swipeable
				key={ item.id }
				ref={ ref => {
					if (ref && !rowRefs.get(item.id)) {
						rowRefs.set(item.id, ref);
					}
				} }
				renderRightActions={ rightSwipeActions }
				onSwipeableOpen={ () => {
					[...rowRefs.entries()].forEach(([key, ref]) => {
						if (key !== item.id && ref) { ref.close(); }
					});
					swipeFromRightOpen(item.id);
				} }
				friction={ 1 }
				enableTrackpadTwoFingerGesture
				rightThreshold={ 40 }

			>
				<View style={ style.content }>
					<View style={ style.row }>
						<BouncyCheckbox
							isChecked={ item.isChecked }
							size={ 20 }
							fillColor={ Colors.yellow.default }
							text={ item.title }
							innerIconStyle={ { borderWidth: 2 } }
							textStyle={ { fontFamily: 'Inter', fontSize: 22, color: Colors.white.default, fontStyle: item.isChecked ? 'italic' : 'normal' } }
							onPress={ (isChecked: boolean) => { setUpdateNoteDispatch({ ...item, isChecked: isChecked }); } }
							style={ { width: '90%' } }
						/>
						<Icons
							name='pencil-box'
							size={ 28 }
							onPress={ () => onPressEdit(item) }
							color={ Colors.yellow.default } />
					</View>
					<Text
						color={ Colors.white.default }
						style={ { marginLeft: 38, textDecorationLine: item.isChecked ? 'line-through' : 'none', fontStyle: item.isChecked ? 'italic' : 'normal' } }
						numberOfLines={ 1 }
						size={ 12 }>{ item.desc }</Text>
					<View style={ [style.row, { marginTop: 6 }] }>
						<Text
							size={ 11 }
							style={ { marginRight: 10 } }
							color={ Colors.white.default }>{ dayjs(item.timestamp).format('DD/MM/YYYY') }</Text>
					</View>
				</View>
			</Swipeable>
		);
	};

	return (
		<View style={ style.container }>
			<FlatList
				data={ listofnotes }
				keyExtractor={ (_, i) => i.toString() }
				renderItem={ renderItem }
				style={ { flex: 1 } }
				ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
			/>
		</View>
	);
};

export default ListOfNotes;
