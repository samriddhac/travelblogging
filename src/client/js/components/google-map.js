import React, { Component } from 'react';
import { connect } from 'react-redux';

const zoom =14;
const pointOfInterest = '+point+of+interest';

class GoogleMap extends Component {

	constructor(props) {
		super(props);
		this.onFoundAttraction = this.onFoundAttraction.bind(this);
		this.setAttractionmarkers = this.setAttractionmarkers.bind(this);
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
			console.log('results '+JSON.stringify(results));
			console.log('this '+this);
			this.setAttractionmarkers(results);
		}
	}
	setAttractionmarkers(locations) {
		let bounds = new google.maps.LatLngBounds();
		if(locations && locations!==null && locations.length>0) {
			let locationMarkers = locations.map((loc) => {
				let m = new google.maps.Marker({
	            	position: loc.geometry.location,
	            	label: loc.name
	          	});
	          	bounds.extend(m.getPosition());
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

	shouldComponentUpdate() {
		return false;
	}
	componentWillReceiveProps(newProps) {
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

export default connect(mapStateToProps)(GoogleMap);