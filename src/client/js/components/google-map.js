import React, { Component } from 'react';
import { connect } from 'react-redux';

const zoom =15;
class GoogleMap extends Component {

	renderMap(pos) {
		this.map = new google.maps.Map(this.refs.map, {
			zoom:zoom,
			center: pos,
			mapTypeId: google.maps.MapTypeId.HYBRID
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
		let centercoord = {
			lat:newProps.coord.lat,
			lng:newProps.coord.lon
		};
		this.map.panTo(centercoord);
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