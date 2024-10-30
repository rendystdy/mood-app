import {
	ActivityIndicator, KeyboardAvoidingView, Modal, Platform, View,
} from 'react-native';
import React, { useState } from 'react';
import { FormikProps, useFormik } from 'formik';
import dayjs from 'dayjs';

import { Container, Header, Input } from '@components';
import { Colors } from '@constant';

import styles from './style';
import { awaitTimeout, NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { NotesInterface } from '@interfaces';
import { Note } from '@validator';

interface ICreateNoteProps {
  route: any;
}

interface MyValues {
	title: string;
	description: string;
}

interface IPayloadUpdate extends NotesInterface.INotes {
	mode?: string;
}

const Loading = ({ visible }: {visible: boolean}) => {
	if (!visible) {
		return;
	}
	return (
		<View style={ styles.centeredView }>
			<Modal
				animationType='slide'
				transparent={ true }
				visible={ visible }>
				<View style={ styles.centeredView }>
					<View style={ styles.modalView }>
						<ActivityIndicator
							size={ 40 }
							animating />
					</View>
				</View>
			</Modal>
		</View>
	);
};

const CreateNote: React.FC<ICreateNoteProps> = ({ route }) => {

	const desc = route?.params?.desc;
	const title = route?.params?.title;
	const id = route?.params?.id;
	const type = route?.params?.type;

	const setNewNoteDispatch = useAppDispatch(Actions.notesAction.setNewNote);
	const setUpdateNoteDispatch = useAppDispatch(Actions.notesAction.setUpdateNote);
	const loading = useAppSelector(state => state.notesReducers.loading);

	const [enableValidation, setEnableValidation] = useState<boolean>(false);

	const formik: FormikProps<MyValues> = useFormik<MyValues>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Note.CreateNoteValidationSchema,
		initialValues: {
			title: title ? title : '',
			description: desc ? desc : '',
		},
		onSubmit: async val => {
			if (type === 'edit') {
				const payload: IPayloadUpdate = {
					id: id,
					title: val.title,
					desc: val.description,
					timestamp: dayjs().format(),
					isChecked: false,
					mode: 'edit',
				};
  
				setUpdateNoteDispatch(payload);
			} else {
        
				const payload: NotesInterface.INotes = {
					id: dayjs().unix(),
					title: val.title,
					desc: val.description,
					timestamp: dayjs().format(),
					isChecked: false,
				};
    
				return setNewNoteDispatch(payload);
			}
    
		},
	});

	const onPressDone = () => {
		setEnableValidation(true);
		formik.handleSubmit();
	};

	return (
		<Container
			noPadding
			noScroll
			contentContainerStyle={ { backgroundColor: Colors.black.default } }>
			<Header onPressDone={ onPressDone } />
			<View style={ styles.container }>
				<KeyboardAvoidingView
					behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
					style={ { flex: 1 } }>
					<Input
						name='title'
						label='Title'
						placeholder='Title'
						style={ { height: 20, padding: 2 } }
						sizeLabel={ 16 }
						formik={ formik }
					/>
					<Input
						name='description'
						label='Description'
						placeholder='Description'
						style={ { height: 20, padding: 2 } }
						sizeLabel={ 16 }
						mt={ 12 }
						formik={ formik }
					/>
				</KeyboardAvoidingView>
			</View>
			<Loading visible={ loading } />
		</Container>
	);
};

export default CreateNote;
