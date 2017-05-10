import React, { Component } from 'react';

import GoogleMap from '../components/google-map';
import NavContainer from '../components/left-nav-container';
import MediaContainer from '../containers/media-container';

export default class ScreenViewManager extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<NavContainer />
					<GoogleMap />
				</div>
				<MediaContainer />
			</div>
		);
	}
}