import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360} from '../common/constants';
import countries from '../data/country.json';
import weathericon from '../data/weather-icons.json';


export function convertWeatherObject(obj) {
	if(obj && obj!==null) {
		return {
			id: obj.id,
			cityName:obj.name,
			countryName:countries[obj.sys.country],
			coord:obj.coord,
			maxTemp:obj.main.temp_max,
			minTemp:obj.main.temp_min,
			humidity:obj.main.humidity,
			localTime:'08:00:00AM',
			icon:weathericon[obj.weather[0].id],
			description:obj.weather[0].description
		};
	}
}
export function resetSelection(obj, objlist) {
	objlist.forEach(function(o) {
		if(o && o!==undefined && o!==null) {
			if(o.id===obj.id) {
				o.selected = true;
			}
			else {
				o.selected = false;
			}
		}
	});
	return objlist;
}
export function resetAllSelection(state) {
	let obj = state.searchState;
	if(obj!==undefined) {
		if(obj.current!==undefined && obj.current!==null){
			let cArray =[];
			obj.current.forEach(function(o) {
				if(o && o!==undefined && o!==null) {
					o.selected = false;
					cArray = [...cArray, o];
				}
			});
			obj.current =cArray;
		}
		if(obj.all!==undefined && obj.all!==null){
			let aArray =[];
			obj.all.forEach(function(o) {
				if(o && o!==undefined && o!==null) {
					o.selected = false;
					aArray = [...aArray, o];
				}
			});
			obj.all =aArray;
		}
		if(obj.fav!==undefined && obj.fav!==null){
			let fArray =[];
			obj.fav.forEach(function(o) {
				if(o && o!==undefined && o!==null) {
					o.selected = false;
					fArray = [...fArray, o];
				}
			});
			obj.fav =fArray;
		}
	}
	state.searchState = obj;
	return state;
}
export function copyMediaList(type, mediaList) {
	let mediaItems = [];
	if(mediaList && mediaList.length!=0) {
		mediaList.forEach(function(o) {
			mediaItems =[...mediaItems, copyMediaObj(type, o)];
		});
	}
	return mediaItems;
}
export function copyMediaObj(type, media) {
	if(type === TYPE_VIDEO) {
		let url = `https://www.youtube.com/embed/${media.id.videoId}`;
		return {
			url
		};
	}
	else if(type === TYPE_IMAGE) {
		return {

		};
	}
}

export const loadState = () =>{
	try{
		const serializedState = localStorage.getItem('state');
		if(serializedState===null){
			return undefined;
		}
		return JSON.parse(serializedState);
	}
	catch(err) {
		return undefined;
	}
} 
export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	}
	catch(err) {
		console.error(err);
	}
}

