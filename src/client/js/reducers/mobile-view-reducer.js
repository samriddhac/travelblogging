import {CHANGE_MOBILE_VIEW} from '../actions/action-types';
import {MOBILE_VIEW_SEARCH} from '../common/constants';
const INITIAL_STATE = {
	id: MOBILE_VIEW_SEARCH
};

export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case CHANGE_MOBILE_VIEW:
			let newState = { ...state, id:action.payload};
			return newState;
		default:
			return state;
	}
}