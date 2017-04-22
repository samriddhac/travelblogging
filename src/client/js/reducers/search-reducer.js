import _ from 'lodash';
import { SEARCH_PLACES, FETCH_SEARCH_HISTORY, SAVE_SEARCH_HISTORY, 
	GO_TO_PLACE, REMOVE_ITEM, SAVE_FAV } from '../actions/action-types';
import { convertWeatherObject,resetSelection } from '../utils/utilities';

const INITIAL_STATE = {
	current: [],
	all:[],
	fav:[]
};
export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SEARCH_PLACES : 
			return {...state, current:[convertWeatherObject(action.payload.data), ...state.current]
				, all:[convertWeatherObject(action.payload.data), ...state.all]};
		case FETCH_SEARCH_HISTORY : 

		case SAVE_SEARCH_HISTORY:

		case SAVE_FAV:
			return saveFav(state, action);
		case REMOVE_ITEM:
			return getRemoveItemState(state, action);
		case GO_TO_PLACE : 
			return getGoToPlaceObjState(state, action);
		default:
			return state;
	}
}

function saveFav(state, action) {
	let objC = _.find(state.current, {id: action.payload.id});
	let indexC = _.indexOf(state.current, objC);
	objC.fav = action.payload.value;
	state.current.splice(indexC, 1, objC);
	let objA = _.find(state.all, {id: action.payload.id});
	let indexA = _.indexOf(state.all, objA);
	objA.fav = action.payload.value;
	state.all.splice(indexA, 1, objA);
	return {...state, current:[...state.current], all:[...state.all], fav:[...state.fav, objA]};
}

function getGoToPlaceObjState(state, action) {
	let currentdata = resetSelection(action.payload, state.current);
	let alldata = resetSelection(action.payload, state.all);
	return {...state,current:[ ...currentdata],
		all:[...alldata]};
}

function getRemoveItemState(state, action) {
	let id = action.payload.id;
	let selected = action.payload.selected;
	let cdata = state.current;
	_.remove(cdata, (item) => {
		return item.id === id;
	});
	let adata = state.all;
	_.remove(adata, (item) => {
		return item.id === id;
	});
	return {...state,current:[ ...cdata],
		all:[...adata]};
}