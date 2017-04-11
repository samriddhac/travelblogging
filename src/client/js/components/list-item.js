import React, { Component } from 'react';

export default class ListItem extends Component {

	constructor(props) {
		super(props);
		this.goToPlace = this.goToPlace.bind(this);
		this.getCssClass = this.getCssClass.bind(this);
	}
	goToPlace(e) {
		this.setState({selected:true});
		this.props.goToPlace(this.props.id, this.props.cityName, this.props.coord);
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
		return (
			<li className={this.getCssClass()}>
			  	<div>
			  		<div>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">City : {this.props.cityName}</span>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">Country : {this.props.countryName}</span>
			  			<span className="light-italic-font font-size-small font-color-shady list-location-child-item pull-right">{this.props.localTime}</span>
			  		</div>
			  		<div className="list-item-weather-container">
			  			<div className="pull-inline weather-component">
			  				<img src={`./images/icons/${this.props.icon}`}/>
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