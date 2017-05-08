import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Header from './header';
import GoogleMap from './google-map';
import NavContainer from './left-nav-container';
import MediaContainer from '../containers/media-container';
import MobileMapContainer from '../containers/mobile-map';

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
				</div>
			</MediaQuery>
			<MediaQuery query='(min-device-width:300px) and (max-device-width: 736px)'>
				<NavContainer />
				<MobileMapContainer />
			</MediaQuery>
			<MediaContainer />
		</div>
	);
}