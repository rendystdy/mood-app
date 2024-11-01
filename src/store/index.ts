import authAction from './auth/auth.action';
import authReducers from './auth/auth.reducer';

import miscAction from './misc/misc.action';
import miscReducers from './misc/misc.reducer';

import moodsAction from './moods/moods.action';
import moodsReducers from './moods/moods.reducer';

const Actions = {
	authAction,
	miscAction,
	moodsAction,
};

const Reducers = {
	authReducers,
	miscReducers,
	moodsReducers,
};

export {
	Actions,
	Reducers,
};
