import { combineReducers } from 'redux';
import SearchReducer from './search-reducer';
import GotoPlaceReducer from './gotoplace-reducer';

const rootReducers =  combineReducers({
	searchState: SearchReducer,
	mapLocation: GotoPlaceReducer
});

export default rootReducers;