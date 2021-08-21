// ========== Root Reducer
// import all modules
import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

// import all reducers
import authReducer from './auth';

const rootPersistConfig = {
	key: 'root',
	storage,
	blacklist: ['auth']
}

const authPersistConfig = {
	key: 'auth',
	storage,
	stateReconciler: hardSet
}

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer)
});

export default persistReducer(rootPersistConfig, rootReducer);