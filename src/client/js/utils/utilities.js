import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360} from '../common/constants';
import _ from 'lodash';
import countries from '../data/country.json';
import weathericon from '../data/weather-icons.json';


export function convertWeatherObject(obj) {
	if(obj && obj!==null) {
		console.log(obj);
		return {
			id: _.uniqueId(),
			cityName:obj.city,
			place:obj.name,
			coord:{lat:obj.weatherData.data.latitude, lon:obj.weatherData.data.longitude},
			temp:obj.weatherData.data.currently.temperature,
			humidity:getPercent(obj.weatherData.data.currently.humidity),
			dewpoint:obj.weatherData.data.currently.dewPoint,
			localTime:getTime(new Date(obj.weatherData.data.currently.time)),
			icon:weathericon[obj.weatherData.data.currently.icon],
			description:obj.weatherData.data.currently.summary
		};
	}
}
function getPercent(val) {
	return Number(val)*100;
}
function getTime(date) {
	var seconds = Math.floor(date.getSeconds()),
        hours = Math.floor(seconds / 3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
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
	if(state!==undefined) {
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
	return {};
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

