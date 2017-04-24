import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState, resetAllSelection } from './utils/utilities';
import reducers from './reducers/index';
import throttle from 'lodash/throttle';

/*const enhancer = compose(
    applyMiddleware(thunk)
);
let store = createStore(reducers, enhancer);
console.log(localStorage);
persistStore(store, {storage: localStorage}, autoRehydrate());*/

const persistedState = resetAllSelection(loadState());
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers, persistedState);
store.subscribe(throttle(()=>{
	saveState({
		searchState: {
			current:[],
			all:store.getState().searchState.all,
			fav:store.getState().searchState.fav
		}
	});
}, 1000));
export default store;