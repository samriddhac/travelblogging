import React, { Component } from 'react';
import Navigation from '../containers/navigation';

class Header extends Component {

	render() {
		return (
			<div className="header row">
				<Navigation/>
			</div>
		);
	}
}
export default Header;