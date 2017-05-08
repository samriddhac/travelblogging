import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showMobileMap } from '../actions/index';
import GoogleMap from '../components/google-map';

class MobileMapContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayText: 'Hide Map'
		};
		this.close = this.close.bind(this);
	}

	close(e) {
		this.props.showMobileMap(false);
	}

	getStyle() {
		if(this.props.showmap) {
			return {display:'block'};
		}
		return {display:'none'};
	}

	render() {
		return (
			<div style={this.getStyle()}>
				<div className="media-bg-btn">
					<span className="close-item close-item-lg media-bg-btn-item close-item-m-list" aria-hidden="true" onClick={this.close}>&times;</span>
				</div>
				<GoogleMap />
			</div>
		);
	}
}

function mapStateToProps(state) {
	let showmap = state.mobileMapState.showmap
	return {showmap};
}
export default connect(mapStateToProps)(MobileMapContainer);