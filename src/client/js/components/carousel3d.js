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
		this.width = this.props.width;
		this.height = this.props.height;
		this.createDataProps();
	}
	componentWillReceiveProps(newProps) {
		this.rotation =0;
		this.panelCount = newProps.mediaList.length;
		this.theta = 0;
		this.mediaList = newProps.mediaList;
		this.width = newProps.width;
		this.height = newProps.height;
		this.createDataProps();
	}

	createDataProps() {
		this.panelSize = this.width;
		this.rotateFn = 'rotateY';
		this.theta = 360/this.panelCount;
		this.radius = Math.round((this.panelSize/2)/Math.tan(Math.PI/this.panelCount));
		this.frameWidth = `${this.width -100}px`;
		this.frameHeight = `${this.height}px`;
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
				<iframe src={dataprop.url} width={this.frameWidth} height={this.frameHeight}></iframe>
			</figure>
		);
	}
	next() {
		this.rotation +=this.theta * 1 * -1;
		this.setCarouselRotationStyle();
	}
	prev() {
		this.rotation +=this.theta * -1 * -1;
		this.setCarouselRotationStyle();
	}
	render() {
		return(
			<div>
				<div className="carousel-container">
					<div className="carousel" style={this.state.rotationStyle} ref="carousel">
						{this.dataProps.map(this.getChildren.bind(this))}
					</div>
				</div>
				<div className="car-nav">
					<img src="./images/icons/previous.png" width="64" height="64" onClick={this.prev.bind(this)}/>
					<img src="./images/icons/next.png" width="64" height="64" onClick={this.next.bind(this)}/>
				</div>
			</div>
		);
	}
}

