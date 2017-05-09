import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Header from './header';
import GoogleMap from './google-map';
import NavContainer from './left-nav-container';
import MediaContainer from '../containers/media-container';
import MobileviewManager from '../containers/mobile-view-manager';

export default (props) => {
	return (
		<div className="home-container">
			<Header />
			<MediaQuery query='(min-device-width:736px) and (max-device-width: 1800px)'>
				<div className="container">
					<div className="row">
						<NavContainer />
						<GoogleMap />
					</div>
					<MediaContainer />
				</div>
			</MediaQuery>
			<MediaQuery query='(min-device-width:300px) and (max-device-width: 736px)'>
				<MobileviewManager />
			</MediaQuery>
		</div>
	);
}