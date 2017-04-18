import React, { Component } from 'react';

export default class Nav3d extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rotationStyle:''
		};
	}
	componentWillMount() {
		this.rotation =0;
		console.log(this.props);
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
		this.rotateFn = 'rotateX';
		this.theta = 360/this.panelCount;
		this.radius = Math.round((this.panelSize/2)/Math.tan(Math.PI/this.panelCount));
		this.frameWidth = `${this.width}px`;
		this.frameHeight = `${this.height}px`;
		let angle = 0;
		this.dataProps = [];
		this.mediaList.map((data, index)=>{
			angle = this.theta * index;
			let style = {
				transform: `${this.rotateFn}(${angle}deg) translateZ(${this.radius}px)`,
				backgroundColor:`hsla(${angle} , 100%, 50%, 0.8)`
			}
			this.dataProps = [...this.dataProps, { url:data.url, icon:data.icon, style:style}];
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
			<figure className="goption-box" style={dataprop.style}>
				<img src={dataprop.icon} width={this.width} height={this.height}/>
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
			<div className="nav-container">
				<div className="nav-up">
					<img src="./images/icons/up.png" width="60" height="60" onClick={this.prev.bind(this)}/>
				</div>
				<div className="n3c">
					<div className="nav3d-container">
						<div className="nav3d" style={this.state.rotationStyle} ref="nav3d">
							{this.dataProps.map(this.getChildren.bind(this))}
						</div>
					</div>
				</div>
				<div className="nav-down">
					<img src="./images/icons/down.png" width="60" height="60" onClick={this.next.bind(this)}/>
				</div>
			</div>
		);
	}
}