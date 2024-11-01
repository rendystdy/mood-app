import { Colors, Dispatches } from '@constant';
import { MoodsInterface } from '@interfaces';

const initialState: MoodsInterface.MoodsState = {
	listofmoods: [
		{
			id: 1,
			name: 'Happy',
			color: Colors.happyLabel,
			colorBg: Colors.happy,
			icon: 'icon-happy',
		},
		{
			id: 2,
			name: 'Neutral',
			color: Colors.neutralLabel,
			colorBg: Colors.neutral,
			icon: 'icon-neutral',
		},
		{
			id: 3,
			name: 'Sad',
			color: Colors.sadLabel,
			colorBg: Colors.sad,
			icon: 'icon-sad',
		},
		{
			id: 4,
			name: 'Stress',
			color: Colors.stressLabel,
			colorBg: Colors.stress,
			icon: 'icon-stress',
		},
	],
	moodData: [],
	modeChart: 'pie',
	loading: false,
};

type Actions = {type: string; payload: any};

const moodsReducers = (
	state = initialState,
	action: Actions,
): MoodsInterface.MoodsState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.SET_VALUE:
			const updateDataMood = [...state.moodData];
			updateDataMood.push(payload);
			return {
				...state,
				moodData: updateDataMood,
			};
		case Dispatches.SET_MODE_CHART:
			return {
				...state,
				modeChart: payload,
			};
		default:
			return state;
	}
};

export default moodsReducers;
