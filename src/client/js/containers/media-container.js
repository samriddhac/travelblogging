import React, { Component } from 'react';
import { connect } from 'react-redux';

import { switchToMedia } from '../actions/index';

class MediaContainer extends Component {

	constructor(props) {
		super(props);
		this.close = this.close.bind(this);
	}

	getStyle() {
		if(this.props.show) {
			return {display:'block'};
		}
		return {display:'none'};
	}
	close(e) {
		this.props.switchToMedia(false);
	}
	render() {
		return (
			<div className="media-container" style={this.getStyle()}>
				<span className="pull-right close-item close-item-lg" aria-hidden="true" onClick={this.close}>&times;</span>
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