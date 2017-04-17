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
	else if(type === TYPE_360) {
		return {

		};
	}
}

