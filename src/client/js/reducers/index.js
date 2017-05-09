import { combineReducers } from 'redux';
import SearchReducer from './search-reducer';
import GotoPlaceReducer from './gotoplace-reducer';
import MediaReducer from './media-reducer';
import MobileViewReducer from './mobile-view-reducer';

const rootReducers =  combineReducers({
	searchState: SearchReducer,
	mapLocation: GotoPlaceReducer,
	mediastate: MediaReducer,
	mobileViewState: MobileViewReducer
});

export default rootReducers;