import React, { Component } from 'react';

const zoom =15;
export default class GoogleMap extends Component {

	renderMap(pos) {
		new google.maps.Map(this.refs.gmap, {
			zoom:zoom,
			center: pos
		});
	}

	componentDidMount() {
		let centercoord = { lat: 0, lng: 0 };
		if(!this.props.coord) {
			if(navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					centercoord.lat = position.coords.latitude;
					centercoord.lng = position.coords.longitude;
					this.renderMap(centercoord);
				});
			}
		}
		else {
			centercoord = this.props.coord;
		}
		this.renderMap(centercoord);
	}

	render()  {
		return (
			<div className="map-content" ref="gmap"></div>
		);
	}
}