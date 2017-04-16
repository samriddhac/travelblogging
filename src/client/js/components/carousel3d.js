import React, { Component } from 'react';

class Carousel3d extends Component {
	constructor(props) {
		super(props);
		this.state = getInitialState();
	}
	getInitialState() {
		return {
			urls:this.props.urls,
			type:this.props.type
		};
	}
	componentDidMount() {
		this.element = this.refs.carousel;
		this.rotation =0;
		this.panelCount = this.props.urlObjects.length;
		this.totalPanelCount = this.props.urlObjects.length;
		this.theta =0;
	}

	create() {
		this.panelSize = this.element['offsetWidth'];
		this.rotateFn = 'rotateY';
		this.theta = 360/this.panelCount;
		this.radius = Matn.round((this.panelSize/2)/Math.tan(Math.PI/this.panelCount));

	}

	getChildren(dataprops) {
		return (
			<figure style={dataprops.style}>

			</figure>
		);
	}

	render() {
		return(
			<div className="carousel" ref="carousel"></div>
		);
	}
}

