import React, { Component } from 'react';

import Header from './header';
import GoogleMap from './google-map';
import NavContainer from './left-nav-container';

export default (props) => {
	return (
		<div className="home-container">
			<Header />
			<div className="container">
				<div className="row">
					<NavContainer />
					<GoogleMap />
				</div>
			</div>
		</div>
	);
}