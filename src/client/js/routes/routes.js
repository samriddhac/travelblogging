import React from 'react';
import { Route } from 'react-router-dom';

import App from '../components/app';
import Home from '../components/home';

export default (
	<div>
		<Route path="/" component={ Home } />
	</div>
);