import {SWITCH_TO_MEDIA} from '../actions/action-types';
import {copyMediaList,copyMediaObj} from '../utils/utilities';

const INITIAL_STATE = {
	show:false,
	mediaList: [],
	activeMedia:{}
};

export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SWITCH_TO_MEDIA:
			let newState = { ...state, show:action.payload.show, name:action.payload.name, 
				type:action.payload.type, mediaList:copyMediaList(action.payload.type, action.payload.mediaList),
				activeMedia:copyMediaObj(action.payload.type, action.payload.activeMedia)};
			return newState;
		default:
			return state;
	}
}