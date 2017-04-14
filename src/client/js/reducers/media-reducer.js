import {SWITCH_TO_MEDIA} from '../actions/action-types';

const INITIAL_STATE = {
	show:false,
	mediaList: [],
	activeMedia:{}
};

export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SWITCH_TO_MEDIA:
			return { ...state, show:action.payload.show};
		default:
			return state;
	}
}