import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import { SEARCH_PLACES, FETCH_SEARCH_HISTORY, SAVE_SEARCH_HISTORY, 
	GO_TO_PLACE, REMOVE_ITEM, SAVE_FAV, 
	DELETE_ALL_HISTORY, DELETE_ALL_FAV } from '../actions/action-types';
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
		case DELETE_ALL_HISTORY : 
			return {...state, all:[], fav:[]};
		case DELETE_ALL_FAV:
			return {...state, fav:[]};
		case SAVE_FAV:
			return saveFav(state, action);
		case REMOVE_ITEM:
			return getRemoveItemState(state, action);
		case GO_TO_PLACE : 
			return getGoToPlaceObjState(state, action);
		case REHYDRATE:
			const savedData = action.payload.callApi || INITIAL_STATE;
			return {...state, ...savedData};
		default:
			return state;
	}
}

function saveFav(state, action) {
	let fdata = [];
	let objC = _.find(state.current, {id: action.payload.id});
	if(objC!==undefined) {
		let indexC = _.indexOf(state.current, objC);
		objC.fav = action.payload.value;
		state.current.splice(indexC, 1, objC);
	}
	let objA = _.find(state.all, {id: action.payload.id});
	if(objA!==undefined) {
		let indexA = _.indexOf(state.all, objA);
		objA.fav = action.payload.value;
		state.all.splice(indexA, 1, objA);
		fdata = state.fav;
		if(action.payload.value===false) {
			_.remove(fdata, (item) => {
				return item.id === action.payload.id;
			});
		}
		else {
			fdata = [...state.fav, objA];
		}
	}
	return {...state, current:[...state.current], all:[...state.all], fav:[...fdata]};
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
	let fdata = state.fav;
	_.remove(fdata, (item) => {
		return item.id === id;
	});
	return {...state,current:[ ...cdata],
		all:[...adata], fav:[...fdata]};
}