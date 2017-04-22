import {GO_TO_PLACE, REMOVE_ITEM} from '../actions/action-types';

const INITIAL_STATE = {};
export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case GO_TO_PLACE : 
			return {...state, coord:action.payload.coord, 
				name:action.payload.name, id:action.payload.id, showDefault:false};
		case REMOVE_ITEM : 
			if(action.payload.selected) {
				return {...state, showDefault:true};
			}
			return state;
		default:
			return state;
	}
}