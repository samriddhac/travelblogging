 import { SEARCH_PLACES, FETCH_SEARCH_HISTORY, SAVE_SEARCH_HISTORY } from '../actions/action-types';
import { convertWeatherObject } from '../utils/utils';

const INITIAL_STATE = {
	current: [],
	all:[]
};
export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SEARCH_PLACES : 
			return {...state, current:[...state.current, convertWeatherObject(action.payload.data)]
				, all:[...state.all, convertWeatherObject(action.payload.data)]};
		case FETCH_SEARCH_HISTORY : 

		case SAVE_SEARCH_HISTORY:

		default:
			return state;
	}
}