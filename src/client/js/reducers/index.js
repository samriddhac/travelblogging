import { combineReducers } from 'redux';
import SearchReducer from './search-reducer';
import GotoPlaceReducer from './gotoplace-reducer';
import MediaReducer from './media-reducer';
import MobileMapReducer from './mobile-map-reducer';

const rootReducers =  combineReducers({
	searchState: SearchReducer,
	mapLocation: GotoPlaceReducer,
	mediastate: MediaReducer,
	mobileMapState: MobileMapReducer
});

export default rootReducers;