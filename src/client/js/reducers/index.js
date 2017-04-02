import { combineReducers } from 'redux';
import Searchreduces from './search-reducer';
import GotoPlaceReducer from './gotoplace-reducer';

const rootReducers =  combineReducers({
	searchState: Searchreduces,
	mapLocation: GotoPlaceReducer
});

export default rootReducers;