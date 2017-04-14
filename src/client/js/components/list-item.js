import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class ListItem extends Component {

	constructor(props) {
		super(props);
		this.goToPlace = this.goToPlace.bind(this);
		this.removeListItem = this.removeListItem.bind(this);
		this.getCssClass = this.getCssClass.bind(this);
	}
	goToPlace(e) {
		this.setState({selected:true});
		this.props.goToPlace(this.props.id, this.props.cityName, this.props.coord);
	}
	removeListItem(e) {
		this.props.removeListItem(this.props.id, this.props.selected);
	}
	getCssClass() {
		if(this.props.selected) {
			return 'list-group-item list-location-item-active rounded-border';
		}
		else {
			return 'list-group-item list-location-item rounded-border';
		}
	}
	render(){
		let closeTooltip = <Tooltip id={`${this.props.id}_close`}>Remove</Tooltip>;
		let weatherTooltip = <Tooltip id={this.props.id}>{this.props.description}</Tooltip>;
		return (
			<li className={this.getCssClass()}>
			  	<div>
			  		<OverlayTrigger overlay={closeTooltip} placement="top"delayShow={300} delayHide={150}>
			  			<span className="pull-right close-item close-item-sm" aria-hidden="true" onClick={this.removeListItem}>&times;</span>
			  		</OverlayTrigger>
			  		<div>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">City : {this.props.cityName}</span>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">Country : {this.props.countryName}</span>
			  			<span className="light-italic-font font-size-small font-color-shady list-location-child-item pull-right">{this.props.localTime}</span>
			  		</div>
			  		<div className="list-item-weather-container">
			  			<div className="pull-inline weather-component">
			  				<OverlayTrigger overlay={weatherTooltip} placement="top"delayShow={300} delayHide={150}>
			  					<img src={`./images/icons/${this.props.icon}`}/>
			  				</OverlayTrigger>
			  				<div>
			  					<div className="light-italic-font font-size-small font-color-shady">Max temp: {this.props.maxTemp}&deg;C</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Min temp: {this.props.minTemp}&deg;C</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Humidity: {this.props.humidity}%</div>
			  				</div>
			  			</div>
			  			<div className="go-to-button pull-right">
			  				<button className="btn btn-success btn-xs" onClick={this.goToPlace} 
			  				>Go to this place</button> 
			  			</div>
			  		</div>
			  	</div>
		  	</li>
		);
	}
	
}