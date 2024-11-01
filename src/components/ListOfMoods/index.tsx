import {
	FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@constant';
import IconHappy from '../../assets/images/icon_happy.svg';
import IconNeutral from '../../assets/images/icon_neutral.svg';
import IconSad from '../../assets/images/icon_sad.svg';
import IconStress from '../../assets/images/icon_stress.svg';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';

const IconComp = ({ icon } : {icon: 'icon-happy' | 'icon-neutral' | 'icon-sad' | 'icon-stress'}) => {

	switch (icon) {
		case 'icon-happy':
			return <IconHappy style={ { marginRight: 16 } } />;
		case 'icon-neutral':
			return <IconNeutral style={ { marginRight: 16 } } />;
		case 'icon-sad':
			return <IconSad style={ { marginRight: 16 } } />;
		case 'icon-stress':
			return <IconStress style={ { marginRight: 16 } } />;
		default:
			return null;
	}
};

const ListOfMoods = () => {
	const listOfMoods = useAppSelector(state => state.moodsReducers.listofmoods);
	const moodData = useAppSelector(state => state.moodsReducers.moodData);
	console.log('🚀 ~ ListOfMoods ~ listOfMoods:', moodData);
	const [itemSelected, setItemSelected] = useState<number | null>(null);
	const setNewValueDispatch = useAppDispatch(Actions.moodsAction.setNewValue);
	const handleOnPress = ({ id, name, icon, color }: {id: number; name: string; icon: 'icon-happy' | 'icon-neutral' | 'icon-sad' | 'icon-stress'; color: string}) => {
		setNewValueDispatch({ moodName: name, timestamp: `${Date.now()}`, color, icon });
		setItemSelected(id);
	};

	return (
		<View style={ styles.container }>
			<FlatList
				data={ listOfMoods }
				keyExtractor={ (_, index) => index.toString() }
				ItemSeparatorComponent={ () => <View style={ { height: 16 } } /> }
				renderItem={ ({ item }) => {
					const isSelected = itemSelected === item.id;
					return (
						<TouchableOpacity
							onPress={ () => handleOnPress({ id: item.id, name: item.name, icon: item.icon, color: item.color }) }
							style={ [
								styles.content,
								{ backgroundColor: item.colorBg, borderColor: isSelected ? item.color : undefined, borderWidth: isSelected ? 1 : 0, shadowColor: Colors.black.default, shadowOpacity: 1, elevation: isSelected ? 5 : 0, shadowRadius: 5 }] }
						>
							<IconComp icon={ item.icon } />
							<Text style={ [styles.textLabel, { color: item.color }] }>{ item.name }</Text>
						</TouchableOpacity>
					);
				} } />
		</View>
	);
};

export default ListOfMoods;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		flex: 1,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 8,
	},
	textLabel: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 18,
	},
});
