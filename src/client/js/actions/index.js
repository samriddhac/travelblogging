import axios from 'axios';
import YTSearch from 'youtube-api-search';
import {SEARCH_PLACES,FETCH_FEEDS,FETCH_FAVS,FETCH_SEARCH_HISTORY,
	SAVE_SEARCH_HISTORY,GO_TO_PLACE, REMOVE_ITEM, SWITCH_TO_MEDIA, SAVE_FAV,
	DELETE_ALL_HISTORY, DELETE_ALL_FAV} from './action-types';
import {WEATHER_ENDPOINT, GOOGLE_API_KEY} from './action-endpoints';
import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360} from '../common/constants';

export function searchCity(term) {
	let url = `${WEATHER_ENDPOINT}&q=${term}`;
	let request = axios.get(url);
	return (dispatch) => {
		request.then((data) => {
			dispatch({
				type: SEARCH_PLACES,
				payload: data
			});
		});
	};
}

export function deleteAllHistory() {
	return {
		type:DELETE_ALL_HISTORY
	};
}
export function deleteAllFav() {
	return {
		type:DELETE_ALL_FAV
	};
}
export function saveFav(id, value) {
	return {
		type:SAVE_FAV,
		payload: {
			id,
			value
		}
	};
}

export function goToPlace(id, name, coord) {
	return {
		type:GO_TO_PLACE,
		payload: {
			id,
			name,
			coord
		}
	};
}

export function removeListItem(id, selected) {
	return {
		type:REMOVE_ITEM,
		payload: {
			id,
			selected
		}
	};
}

export function switchToMedia(value, type, name, coord) {
	if(type === TYPE_VIDEO) {
		return (dispatch)=> {
			YTSearch({key:GOOGLE_API_KEY, term: name, maxResult:10}, (videos) => {
				let firstMedia = videos[0];
				dispatch({
					type:SWITCH_TO_MEDIA,
					payload: {
						show:value,
						name,
						type,
						mediaList:videos,
						activeMedia:firstMedia,
						coord
					}
				});
			});
		};
	}
	else if(type === TYPE_360) {
		return {
			type:SWITCH_TO_MEDIA,
			payload: {
				show:value,
				name,
				type,
				mediaList:[],
				activeMedia:{},
				coord
			}
		};
	}
	else {
		return {
			type:SWITCH_TO_MEDIA,
			payload: {
				show:value,
				name,
				type,
				mediaList:[],
				activeMedia:{}
			}
		};
	}
}