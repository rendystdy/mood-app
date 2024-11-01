import { Dispatches } from '@constant';
import { MoodsInterface } from '@interfaces';
import { Dispatch } from 'redux';

import Toast from 'react-native-toast-message';

export default {
	setNewValue: (payload: MoodsInterface.IPayload) => async(dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_VALUE,
			payload: payload,
		});
		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: 'Berhasil update data!',
		});
	},
	setModeChart: (payload: MoodsInterface.IPayload) => async(dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_MODE_CHART,
			payload: payload,
		});
		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: 'Berhasil merubah data display!',
		});
	},
};
