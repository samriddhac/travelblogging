import React, { Component } from 'react';

import Header from './header';
import GoogleMap from './google-map';

export default (props) => {
	return (
		<div className="home-container">
			<Header />
			<GoogleMap />
		</div>
	);
}