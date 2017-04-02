import { combineReducers } from 'redux';
import Searchreduces from './search-reducer';

const rootReducers =  combineReducers({
	searchState: Searchreduces
});

export default rootReducers;