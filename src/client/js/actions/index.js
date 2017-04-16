import axios from 'axios';
import YTSearch from 'youtube-api-search';
import {SEARCH_PLACES,FETCH_FEEDS,FETCH_FAVS,FETCH_SEARCH_HISTORY,
	SAVE_SEARCH_HISTORY,GO_TO_PLACE, REMOVE_ITEM, SWITCH_TO_MEDIA} from './action-types';
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

export function switchToMedia(value, type, name) {
	if(type === TYPE_VIDEO) {
		return (dispatch)=> {
			YTSearch({key:GOOGLE_API_KEY, term: name}, (videos) => {
				let firstMedia = videos[0];
				dispatch({
					type:SWITCH_TO_MEDIA,
					payload: {
						show:value,
						name,
						mediaList:videos,
						activeMedia:firstMedia
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
				mediaList:[],
				activeMedia:{}
			}
		};
	}
	else {
		return {
			type:SWITCH_TO_MEDIA,
			payload: {
				show:value,
				name,
				mediaList:[],
				activeMedia:{}
			}
		};
	}
}