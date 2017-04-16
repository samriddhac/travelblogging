import React, { Component } from 'react';
import { connect } from 'react-redux';

import { switchToMedia } from '../actions/index';

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
		setTimeout(()=>{
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
		},100);
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
	}
	render() {
		return (
			<div className={this.getContainerClass()} style={this.getStyle()}>
			<div className="media-bg-btn">
				<span className="media-bg-btn-item"><button className="btn btn-success btn-xs" onClick={this.setCss}>{this.state.displayText}</button></span>
				<span className="close-item close-item-lg media-bg-btn-item close-item-m-list" aria-hidden="true" onClick={this.close}>&times;</span>
			</div>
			</div>
		);
	}

}
function mapStateToProps(state) {
	return {
		show:state.mediastate.show
	};
}
export default connect(mapStateToProps, {switchToMedia})(MediaContainer);