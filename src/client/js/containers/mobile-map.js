import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { changeMobileView } from '../actions/index';
import { MOBILE_VIEW_SEARCH } from  '../common/constants';
import GoogleMap from '../components/google-map';
import {mobileMapconfig} from '../utils/configs';
import {getUUID} from '../utils/utilities';

class MobileMapContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cssClass: 'mobile-map-container'
		};
		this.close = this.close.bind(this);
	}
	close(e) {
		console.log('Close called');
		this.setState({
 			cssClass: 'mobile-map-container-leave'
 		});
 		setTimeout(()=>{
			this.props.changeMobileView(MOBILE_VIEW_SEARCH);
		}, 500);
	}
	render() {
		return (
			<div key={getUUID()} className={this.state.cssClass}>
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