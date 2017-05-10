import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeMobileView } from '../actions/index';
import { MOBILE_VIEW_SEARCH } from  '../common/constants';
import GoogleMap from '../components/google-map';

class MobileMapContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayText: 'Hide Map'
		};
		this.close = this.close.bind(this);
	}
	close(e) {
		this.props.changeMobileView(MOBILE_VIEW_SEARCH);
	}
	render() {
		return (
			<div className="mobile-map-container">
				<div className="mobile-back-btn" onClick={this.close}>
					<img src="./images/icons/arrow-back.ico" width="40px" height="40px"/>
				</div>
				<GoogleMap />
			</div>
		);
	}
}

function mapStateToProps(state) {
	let viewId = state.mobileViewState.id;
	return {viewId};
}
export default connect(mapStateToProps, {changeMobileView})(MobileMapContainer);