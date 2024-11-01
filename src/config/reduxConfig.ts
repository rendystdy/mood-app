import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import {
	applyMiddleware,
	legacy_createStore as createStore,
	combineReducers,
	compose,
} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { Reducers } from '../store';

const rootReducer = combineReducers({ ...Reducers });

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['moodsReducers'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch | Dispatch<any>;
export { store, persistor };
