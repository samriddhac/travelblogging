import axios from 'axios';
import {SEARCH_PLACES,FETCH_FEEDS,FETCH_FAVS,FETCH_SEARCH_HISTORY,
	SAVE_SEARCH_HISTORY,GO_TO_PLACE, REMOVE_ITEM} from './action-types';
import {WEATHER_ENDPOINT, googleConfig} from './action-endpoints';

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

export function removeListItem(id) {
	return {
		type:REMOVE_ITEM,
		payload: {
			id
		}
	};
}