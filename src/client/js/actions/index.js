import axios from 'axios';
import YTSearch from 'youtube-api-search';

import {SEARCH_PLACES,FETCH_FEEDS,FETCH_FAVS,FETCH_SEARCH_HISTORY,
	SAVE_SEARCH_HISTORY,GO_TO_PLACE, REMOVE_ITEM, SWITCH_TO_MEDIA, SAVE_FAV,
	DELETE_ALL_HISTORY, DELETE_ALL_FAV} from './action-types';
import {WEATHER_ENDPOINT, GOOGLE_API_KEY, WEATHER_API_KEY} from './action-endpoints';
import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360} from '../common/constants';

function getPlace(term) {
	return new Promise((resolve, reject) => {
		let placeService = new google.maps.places.PlacesService(document.createElement('div'));
		let request = {
			query:`${term}`
		};
		placeService.textSearch(request, (results, status) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				resolve(results);
			}
			else {
				reject(status);
			}
		});
	});
}

export function searchCity(term) {
	return (dispatch) => {
		getPlace(term).then((result) => {
			let lat = result[0].geometry.location.lat();
			let lng = result[0].geometry.location.lng();
			let url = `${WEATHER_ENDPOINT}/${lat}/${lng}`;
			let request = axios.get(url);
			request.then((data) => {
				dispatch({
					type: SEARCH_PLACES,
					payload: {
						name:result[0].formatted_address,
						city:result[0].name,
						weatherData:data
					}
				});
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