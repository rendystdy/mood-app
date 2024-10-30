import { Dispatches } from '@constant';
import { NotesInterface } from '@interfaces';

const initialState: NotesInterface.NotesState = {
	listofnotes: [],
	tempListOfNotes: [],
	loading: false,
};

type Actions = { type: string; payload: any };

const authReducers = (
	state = initialState,
	action: Actions,
): NotesInterface.NotesState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.SET_NEW_NOTE:
			const newData = state.listofnotes?.concat(payload);
			return {
				...state,
				listofnotes: newData,
				tempListOfNotes: newData,
			};
		case Dispatches.SET_UPDATE_NOTE:
			const updatedNotes = state.listofnotes.map(note =>
				note.id === payload.id
					? { ...note, ...payload } // merge the existing note with the updated fields from payload
					: note
			);

			return {
				...state,
				listofnotes: updatedNotes,
				tempListOfNotes: updatedNotes,
			};
		case Dispatches.REMOVE_ITEM_NOTE:
			const removeItemNote = state.listofnotes.filter(item => item.id !== payload);
			return {
				...state,
				listofnotes: removeItemNote,
				tempListOfNotes: removeItemNote,
			};
		case Dispatches.LOADING_NEW_NOTE:
			return {
				...state,
				loading: payload,
			};
		case Dispatches.FILTER_TODOS:
			const filterUncomplete = payload && state.listofnotes?.length > 0 ? state.listofnotes?.filter(item => item.isChecked !== payload) : state.tempListOfNotes;
			return {
				...state,
				listofnotes: filterUncomplete ? filterUncomplete : [],
			};
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default authReducers;
