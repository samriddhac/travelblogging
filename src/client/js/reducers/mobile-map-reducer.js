import {SHOW_MOBILE_MAP} from '../actions/action-types';
import {copyMediaList,copyMediaObj} from '../utils/utilities';

const INITIAL_STATE = {
	showmap:false
};

export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SHOW_MOBILE_MAP:
			let newState = { ...state, showmap:action.payload};
			return newState;
		default:
			return state;
	}
}