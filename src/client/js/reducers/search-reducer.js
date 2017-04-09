 import { SEARCH_PLACES, FETCH_SEARCH_HISTORY, SAVE_SEARCH_HISTORY, GO_TO_PLACE } from '../actions/action-types';
import { convertWeatherObject,resetSelection } from '../utils/utils';

const INITIAL_STATE = {
	current: [],
	all:[]
};
export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SEARCH_PLACES : 
			return {...state, current:[convertWeatherObject(action.payload.data), ...state.current]
				, all:[convertWeatherObject(action.payload.data), ...state.all]};
		case FETCH_SEARCH_HISTORY : 

		case SAVE_SEARCH_HISTORY:

		case GO_TO_PLACE : 
			let currentdata = resetSelection(action.payload, state.current);
			let alldata = resetSelection(action.payload, state.all);
			return {...state,current:[ ...currentdata],
				all:[...alldata]};
		default:
			return state;
	}
}