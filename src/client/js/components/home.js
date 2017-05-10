import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Header from './header';
import ScreenViewManager from '../containers/screen-view-manager';
import MobileviewManager from '../containers/mobile-view-manager';

export default (props) => {
	return (
		<div className="home-container">
			<Header />
			<MediaQuery query='(min-device-width:300px) and (max-device-width: 736px)'>
				<MobileviewManager />
			</MediaQuery>
			<MediaQuery query='(min-device-width:736px) and (max-device-width: 1800px)'>
				<ScreenViewManager />
			</MediaQuery>
		</div>
	);
}