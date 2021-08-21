// ========== Store
// import all modules
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedStore = () => {
	const store = createStore(
		rootReducer, 
		composeEnhancers(
			applyMiddleware(
				thunk
			)
		)
	);

	const persistor = persistStore(store);

	return {
		store,
		persistor
	}
}

export default persistedStore;