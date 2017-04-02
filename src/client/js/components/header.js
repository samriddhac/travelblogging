import React, { Component } from 'react';
import Navigation from '../containers/navigation';

class Header extends Component {

	render() {
		return (
			<nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse nav-no-margin">
				<a href="#" className="navbar-brand">TravelCast</a>
				<div>
					<ul>
					<li>Login</li>
					</ul>
				</div>
			</nav>
		);
	}
}
export default Header;