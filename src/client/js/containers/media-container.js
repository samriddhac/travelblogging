import React, { Component } from 'react';
import { connect } from 'react-redux';

import { switchToMedia, changeMobileView } from '../actions/index';
import Carousel3d from '../components/carousel3d';
import StreetView from '../components/streetview';
import {TYPE_IMAGE, TYPE_VIDEO, TYPE_360, MOBILE_VIEW_MAP} from '../common/constants';

class MediaContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayText: 'Turn on the light',
			showLight:-1
		};
		this.close = this.close.bind(this);
		this.setCss = this.setCss.bind(this);
	}
	setCss(e) {
		if(this.state.showLight === 1) {
			this.setState({
				displayText: 'Turn on the light',
				showLight:-1
			});
		}
		else if(this.state.showLight === -1){
			this.setState({
				displayText: 'Turn off the light',
				showLight:1
			});
		}
	}
	getStyle() {
		if(this.props.show) {
			return {display:'block'};
		}
		return {display:'none'};
	}
	getContainerClass() {
		if(this.state.showLight==1) {
			return 'media-container media-bg m-light';
		}
		if(this.state.showLight==-1) {
			return 'media-container media-bg m-dark';
		}
	}
	close(e) {
		this.props.switchToMedia(false);
		this.props.changeMobileView(MOBILE_VIEW_MAP);
	}
	render() {
		let {name, type, mediaList, coord } = this.props;
		let view = (<Carousel3d mediaList={mediaList} type={type} name={name} width="504" height="254" />);
		if(type === TYPE_360) {
			view = (<StreetView coord={coord} />);
		}
		return (
			<div className={this.getContainerClass()} style={this.getStyle()}>
				<div className="media-bg-btn">
					<span className="media-bg-btn-item"><button className="btn btn-success btn-xs" onClick={this.setCss}>{this.state.displayText}</button></span>
					<span onClick={this.close}><img src='./images/icons/cross.png' width="20px" height="20px"/></span>
				</div>
				{view}
			</div>
		);
	}

}
function mapStateToProps(state) {
	return {
		show:state.mediastate.show,
		mediaList:state.mediastate.mediaList,
		activeMedia:state.mediastate.activeMedia,
		type:state.mediastate.type,
		name:state.mediastate.name,
		coord:state.mediastate.coord
	};
}
export default connect(mapStateToProps, {switchToMedia, changeMobileView})(MediaContainer);