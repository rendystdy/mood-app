import { Dispatches } from '@constant';
import { NavigationHelper } from '@helpers';
import { NotesInterface } from '@interfaces';
import { Dispatch } from 'redux';

import Toast from 'react-native-toast-message';
import { awaitTimeout } from '@helpers';

interface IPayloadUpdate extends NotesInterface.INotes {
	mode?: string;
}

export default {
	setNewNote: (payload: NotesInterface.INotes) => async(dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_NEW_NOTE,
			payload: true,
		});

		await awaitTimeout(5000);
		dispatch({
			type: Dispatches.SET_NEW_NOTE,
			payload: payload,
		});
		dispatch({
			type: Dispatches.LOADING_NEW_NOTE,
			payload: false,
		});
		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: 'Berhasil menambahkan data baru!',
		});
		NavigationHelper.push('Home');
	},
	setUpdateNote: (payload: IPayloadUpdate) => async(dispatch: Dispatch) => {

		if (payload.mode === 'edit') {
			dispatch({
				type: Dispatches.LOADING_NEW_NOTE,
				payload: true,
			});
	
			await awaitTimeout(5000);
			delete payload.mode;
			dispatch({
				type: Dispatches.SET_UPDATE_NOTE,
				payload: payload,
			});
			dispatch({
				type: Dispatches.LOADING_NEW_NOTE,
				payload: false,
			});
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Berhasil updated!',
			});
			NavigationHelper.push('Home');
		} else {
			dispatch({
				type: Dispatches.SET_UPDATE_NOTE,
				payload: payload,
			});
		}
	},
	removeItemNote: (payload: number) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_NEW_NOTE,
			payload: false,
		});
		dispatch({
			type: Dispatches.REMOVE_ITEM_NOTE,
			payload: payload,
		});
	},
	filterTodos: (payload: boolean) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.LOADING_NEW_NOTE,
			payload: false,
		});
		dispatch({
			type: Dispatches.FILTER_TODOS,
			payload: payload,
		});
	},
};
