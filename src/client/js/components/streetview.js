import React, { Component } from 'react';

export default class StreetView extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.sv = new google.maps.StreetViewService();
		this.panorama = new google.maps.StreetViewPanorama(this.refs.pano);
		let _this = this;
		this.sv.getPanorama({location: {lat: Number(this.props.coord.lat), lng: Number(this.props.coord.lng)}, 
			radius: 50}, (data, status)=>{
				console.log(data);
				console.log(status);
				if (status === 'OK') {
					_this.panorama.setPano(data.location.pano);
		          	_this.panorama.setPov({
		            	heading: 270,
		            	pitch: 0
		          	});
		          	_this.panorama.setVisible(true);
				}
				else {
					console.log('Failed to load panorama view ');
				}
			});
	}

	render() {
		return (
			<div className="streetview" ref="pano"></div>
		);
	}
}