import React, {Component} from 'react';
import {connect} from 'react-redux';

import {MOBILE_VIEW_SEARCH, MOBILE_VIEW_MAP, 
	MOBILE_VIEW_MEDIA, MOBILE_VIEW_ABOUT} from '../common/constants';

import NavContainer from '../components/left-nav-container';
import MediaContainer from './media-container';
import MobileMapContainer from './mobile-map';

class MobileviewManager extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let view = (<NavContainer />);
		if(this.props.viewId === MOBILE_VIEW_SEARCH) {
			view = (<NavContainer />);
		}
		else if(this.props.viewId === MOBILE_VIEW_MAP) {
			view = (<MobileMapContainer />);
		}
		else if(this.props.viewId === MOBILE_VIEW_MEDIA) {
			view = (<MediaContainer />);
		}
		return (<div>{view}</div>);
	}
}
function mapStateToProps(state) {
	let viewId = state.mobileViewState.id;
	return { viewId }; 
}
export default connect(mapStateToProps)(MobileviewManager);