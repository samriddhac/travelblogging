import React from 'react';

class Navigation extends React.Component {

	render() {
		return (
			<div className="navbar">
				<div className="navlink">SAMPLE GALLARIES</div>
				<div className="navlink">About</div>
				<div className="navlink dropdown navlink-button">
					<span>SIGN IN</span>
					<div className="dropdown-content signin-content">
						<div className="dropdown-element signin-element">
							<img src="./images/icons/fb.png"/>
							<span>Sign In with Facebook</span>
						</div>
						<div className="dropdown-element signin-element">
							<img src="./images/icons/google.png"/>
							<span>Sign In with Google</span>
						</div>
					</div>	
				</div>
				<div className="navlink search"><img src="./images/icons/search.png"/></div>
			</div>
		);
	};
}
export default Navigation;