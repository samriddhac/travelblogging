import React, { Component } from 'react';

export default class Carousel3d extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rotationStyle:''
		};
	}
	componentWillMount() {
		this.rotation =0;
		this.panelCount = this.props.mediaList.length;
		this.theta =0;
		this.mediaList = this.props.mediaList;
		this.createDataProps();
	}
	componentWillReceiveProps(newProps) {
		this.rotation =0;
		this.panelCount = newProps.mediaList.length;
		this.theta = 0;
		this.mediaList = newProps.mediaList;
		this.createDataProps();
	}

	createDataProps() {
		this.panelSize = this.props.width;
		this.rotateFn = 'rotateY';
		this.theta = 360/this.panelCount;
		this.radius = Math.round((this.panelSize/2)/Math.tan(Math.PI/this.panelCount));
		let angle = 0;
		this.dataProps = [];
		this.mediaList.map((data, index)=>{
			angle = this.theta * index;
			let style = {
				transform: `${this.rotateFn}(${angle}deg) translateZ(${this.radius}px)`
			}
			this.dataProps = [...this.dataProps, { url:data.url, style:style}];
		});
		this.rotation = Math.round(this.rotation/this.theta) * this.theta;
		this.setCarouselRotationStyle();
	}

	setCarouselRotationStyle() {
		this.setState({
			rotationStyle:{
				transform:`translateZ(-${this.radius}px) ${this.rotateFn}(${this.rotation}deg)`
			}
		});
	}

	getChildren(dataprop) {
		return (
			<figure style={dataprop.style}>
				<iframe className="embed-responsive-item" src={dataprop.url}></iframe>
			</figure>
		);
	}

	render() {
		return(
			<div className="carousel" style={this.state.rotationStyle} ref="carousel">
				{this.dataProps.map(this.getChildren)}
			</div>
		);
	}
}

