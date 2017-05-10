import React, { Component } from 'react';
import {getUUID} from '../utils/utilities';

export default class Nav3d extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rotationStyle:''
		};
		this.onItemClick = this.onItemClick.bind(this);
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
		this.panelSize = this.height;
		this.rotateFn = 'rotateX';
		this.theta = 360/this.panelCount;
		this.radius = Math.round((this.panelSize/2)/Math.tan(Math.PI/this.panelCount));
		this.frameWidth = `${this.width}px`;
		this.frameHeight = `${this.height-10}px`;
		let angle = 0;
		this.dataProps = [];
		this.mediaList.map((data, index)=>{
			angle = this.theta * index;
			let style = {
				transform: `${this.rotateFn}(${angle}deg) translateZ(${this.radius}px)`
			}
			this.dataProps = [...this.dataProps, { url:data.url, icon:data.icon, 
				name:data.name, style:style}];
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
	onItemClick(e) {
		const placeproperty = e.target.getAttribute('data-place-type');
		this.props.onOptionClick(placeproperty);
	}
	getChildren(dataprop) {
		return (
			<figure className="goption-box font-normal font-size-xm" 
			style={dataprop.style} onClick={this.onItemClick}>
				<img src={dataprop.icon} width="42px" height="42px" data-place-type={dataprop.name}/>
				<span data-place-type={dataprop.name}>{dataprop.name}</span>
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
					<img src="./images/icons/up.ico" width="42" height="42" onClick={this.prev.bind(this)}/>
				</div>
				<div className="n3c">
					<div className="nav3d-container">
						<div className="nav3d" style={this.state.rotationStyle} ref="nav3d">
							{this.dataProps.map(this.getChildren.bind(this))}
						</div>
					</div>
				</div>
				<div className="nav-down">
					<img src="./images/icons/down.ico" width="42" height="42" onClick={this.next.bind(this)}/>
				</div>
			</div>
		);
	}
}