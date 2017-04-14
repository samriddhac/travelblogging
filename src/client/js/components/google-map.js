import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { switchToMedia } from '../actions/index';
import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360} from '../common/constants';

const zoom =14;
const pointOfInterest = '+point+of+interest';

class GoogleMap extends Component {

	constructor(props) {
		super(props);
		this.onFoundAttraction = this.onFoundAttraction.bind(this);
		this.setAttractionmarkers = this.setAttractionmarkers.bind(this);
		this.renderInfoWindow = this.renderInfoWindow.bind(this);
		this.showImage = this.showImage.bind(this);
		this.showVideo = this.showVideo.bind(this);
		this.show360 = this.show360.bind(this);
	}

	renderMap(pos) {
		this.map = new google.maps.Map(this.refs.map, {
			zoom:zoom,
			center: pos,
			mapTypeId: google.maps.MapTypeId.HYBRID
		});
		this.placeService = new google.maps.places.PlacesService(this.map);
		this.setMarker(pos);
	}
	searchPlaceAttactions(name) {
		let request = {
			query:`${name}${pointOfInterest}`
		}
		this.placeService.textSearch(request, this.onFoundAttraction);
	} 
	onFoundAttraction(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			this.setAttractionmarkers(results);
		}
	}
	showImage(e) {
		const placeName = e.target.getAttribute('data-place');
		this.props.switchToMedia(true, TYPE_IMAGE, placeName);
	}
	showVideo(e) {
		const placeName = e.target.getAttribute('data-place');
		this.props.switchToMedia(true, TYPE_VIDEO, placeName);
	}
	show360(e) {
		const placeName = e.target.getAttribute('data-place');
		this.props.switchToMedia(true, TYPE_360, placeName);
	}
	setAttractionmarkers(locations) {
		let _this = this;
		let bounds = new google.maps.LatLngBounds();
		let infowindow = new google.maps.InfoWindow();
		if(locations && locations!==null && locations.length>0) {
			let locationMarkers = locations.map((loc) => {
				let m = new google.maps.Marker({
	            	position: loc.geometry.location
	          	});
	          	bounds.extend(m.getPosition());
	          	google.maps.event.addListener(m, 'click', function() {
	          		let infoDiv = document.createElement('div');
	          		ReactDOM.render(_this.renderInfoWindow(loc), infoDiv);
		          	infowindow.setContent(infoDiv);
		          	infowindow.open(this.map, this);
		        });
	          	return m;
			});
			this.map.fitBounds(bounds);
			this.markerCluster = new MarkerClusterer(this.map, locationMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
		}
	}
	
	setMarker(centercoord) {
		this.marker = new google.maps.Marker({
          position: centercoord,
          animation: google.maps.Animation.DROP,
          map: this.map
        });
	}

	componentDidMount() {
		let centercoord = { lat: 0, lng: 0 };
		if(!this.props.coord || (!this.props.coord.lat && !this.props.coord.lon)) {
			if(navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					centercoord.lat = position.coords.latitude;
					centercoord.lng = position.coords.longitude;
					this.renderMap(centercoord);
				});
			}
		}
		else {
			centercoord = {
				lat:this.props.coord.lat,
				lng:this.props.coord.lon
			};
		}
		this.renderMap(centercoord);
	}
	renderInfoWindow(place) {
		let photoUrl = './images/icons/no-image.png';
		if(place.photos && place.photos[0] && place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})) {
			photoUrl = place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 120});
		}
		return(
			<div className="info-window">
				<div className="info-image-container">
					<object data={photoUrl} type="image/png" width="100" height="120">
						<img src="./images/icons/no-image.png" width="100" height="120" />
					</object>
				</div>	
				<div className="info-data-container">
					<div className="info-data-item bold-italic-font font-size-small font-color-blue">Name : {place.name}</div>
					<div className="info-data-item bold-italic-font font-size-small font-color-blue">Address : {place.formatted_address}</div>
					<div className="info-data-item">
						<span className="info-button"><button data-place={place.name} className="btn btn-xs btn-success" onClick={this.showImage}>images</button></span>
						<span className="info-button"><button data-place={place.name} className="btn btn-xs btn-success" onClick={this.showVideo}>videos</button></span>
						<span className="info-button"><button data-place={place.name} className="btn btn-xs btn-success" onClick={this.show360}>360&deg; view</button></span>
					</div>
				</div>
			</div>
		);
	}
	shouldComponentUpdate() {
		return false;
	}
	componentWillReceiveProps(newProps) {
		if(newProps.showDefault){
			if(navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					let centercoord ={};
					centercoord.lat = position.coords.latitude;
					centercoord.lng = position.coords.longitude;
					this.map.panTo(centercoord);
					this.setMarker(centercoord);
				});
			}
		}
		else {
			if(newProps.coord) {
				let centercoord = {
					lat:newProps.coord.lat,
					lng:newProps.coord.lon
				};
				this.map.panTo(centercoord);
				this.setMarker(centercoord);
			}
			if(newProps.name) {
				this.searchPlaceAttactions(newProps.name);
			}
		}
	}

	render()  {
		return (
			<div className="col-md-8 bg-dusky">
				<div id="map" className="full-page-height" ref="map"></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	let newprop = {...state.mapLocation};
	return newprop;
}

export default connect(mapStateToProps, {switchToMedia})(GoogleMap);