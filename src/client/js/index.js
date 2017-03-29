import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  createBrowserHistory  from 'history/createBrowserHistory';

import routes from './routes/routes';
import store from './store';


ReactDOM.render(
<Provider store={ store }>
	<Router>
		{ routes }
	</Router>
</Provider>, document.querySelector('.react-container')
);

