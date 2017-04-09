import {GO_TO_PLACE} from '../actions/action-types';

const INITIAL_STATE = {};
export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case GO_TO_PLACE : 
			return {...state, coord:action.payload.coord};
		default:
			return state;
	}
}