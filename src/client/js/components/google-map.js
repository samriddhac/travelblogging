import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { switchToMedia } from '../actions/index';
import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360} from '../common/constants';
import Nav3d from './nav3d';
import googleOptions from '../data/gmap-options.json';

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
		this.onOptionClick = this.onOptionClick.bind(this);
	}

	componentWillMount() {
		this.populateMapOptions();
	}

	renderMap() {
		this.map = new google.maps.Map(this.refs.map, {
			zoom:zoom,
			center: this.centercoord,
			mapTypeId: google.maps.MapTypeId.HYBRID
		});
		this.placeService = new google.maps.places.PlacesService(this.map);
		this.setMarker();
	}
	searchPlaceAttactions(name, type) {
		let request = null;
		if(name) {
			request = {
				query:`${name}${pointOfInterest}`
			};
			this.placeService.textSearch(request, this.onFoundAttraction);
		}
		else if(type){
			request = {
				location: this.centercoord,
			    query: type
			};
			this.currentype = type;
			this.placeService.textSearch(request, this.onFoundAttraction);
		}
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
	onOptionClick(type) {
		this.searchPlaceAttactions(null, type);
	}
	setAttractionmarkers(locations) {
		let _this = this;
		this.locationMarkers =[];
		this.resetMarkers();
		let bounds = new google.maps.LatLngBounds();
		let infowindow = new google.maps.InfoWindow();
		if(locations && locations!==null && locations.length>0) {
			locations.map((loc) => {
				let iconpath = './images/icons/google-map/places.png';
				if(this.currentype && this.currentype!==null && this.currentype!==''){
					let objG = _.find(googleOptions, {name:this.currentype});
					iconpath = objG[`${this.currentype}-icon`];
				}
				let m = new google.maps.Marker({
	            	position: loc.geometry.location,
	            	title:loc.name,
	            	icon:iconpath
	          	});
	          	bounds.extend(m.getPosition());
	          	google.maps.event.addListener(m, 'click', function() {
	          		let infoDiv = document.createElement('div');
	          		ReactDOM.render(_this.renderInfoWindow(loc), infoDiv);
		          	infowindow.setContent(infoDiv);
		          	infowindow.open(this.map, this);
		        });
	          	this.locationMarkers = [...this.locationMarkers, m];
			});
			this.map.fitBounds(bounds);
			this.markerCluster = new MarkerClusterer(
				this.map, 
				this.locationMarkers,
				{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
				);
		}
	}
	resetMarkers() {
		if(this.locationMarkers) {
			this.locationMarkers.map((m) => {
				m.setMap(null);
			});
			this.locationMarkers = [];
		}
	}
	setMarker() {
		this.marker = new google.maps.Marker({
          position: this.centercoord,
          animation: google.maps.Animation.DROP,
          icon:'./images/icons/google-map/default.png',
          map: this.map
        });
	}

	componentDidMount() {
		this.centercoord = { lat: 0, lng: 0 };
		if(!this.props.coord || (!this.props.coord.lat && !this.props.coord.lon)) {
			if(navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					this.centercoord.lat = position.coords.latitude;
					this.centercoord.lng = position.coords.longitude;
					this.renderMap();
				});
			}
		}
		else {
			this.centercoord = {
				lat:this.props.coord.lat,
				lng:this.props.coord.lon
			};
		}
		this.renderMap();
	}
	populateMapOptions() {
		this.optionList = googleOptions;
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
					<div className="info-data-item bold-italic-font font-size-small">Name : {place.name}</div>
					<div className="info-data-item bold-italic-font font-size-small">Address : {place.formatted_address}</div>
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
					this.centercoord ={};
					this.centercoord.lat = position.coords.latitude;
					this.centercoord.lng = position.coords.longitude;
					this.map.panTo();
					this.setMarker();
				});
			}
		}
		else {
			if(newProps.coord) {
				this.centercoord = {
					lat:newProps.coord.lat,
					lng:newProps.coord.lon
				};
				console.log(this.centercoord);
				this.map.panTo(this.centercoord);
				this.setMarker();
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
				<Nav3d width="64" height="80" mediaList={this.optionList} 
				onOptionClick={this.onOptionClick} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	let newprop = {...state.mapLocation};
	return newprop;
}

export default connect(mapStateToProps, {switchToMedia})(GoogleMap);