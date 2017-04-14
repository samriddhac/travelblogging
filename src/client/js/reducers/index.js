import { combineReducers } from 'redux';
import SearchReducer from './search-reducer';
import GotoPlaceReducer from './gotoplace-reducer';
import MediaReducer from './media-reducer';

const rootReducers =  combineReducers({
	searchState: SearchReducer,
	mapLocation: GotoPlaceReducer,
	mediastate: MediaReducer
});

export default rootReducers;