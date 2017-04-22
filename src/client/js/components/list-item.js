import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class ListItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			favIcon:'./images/icons/fav-add.png',
			favText:'Add to favourites'
		};
		this.goToPlace = this.goToPlace.bind(this);
		this.removeListItem = this.removeListItem.bind(this);
		this.getCssClass = this.getCssClass.bind(this);
		this.setFav = this.setFav.bind(this);
		this.setFavState = this.setFavState.bind(this);
	}
	componentWillReceiveProps(newProps) {
		this.setFavState(newProps);
	}
	goToPlace(e) {
		this.props.goToPlace(this.props.id, this.props.cityName, this.props.coord);
	}
	setFav(e) {
		if(this.props.fav && this.props.fav === true) {
			this.props.saveFav(this.props.id, false);
		}
		else {
			this.props.saveFav(this.props.id, true);
		}
		this.setFavState(this.props);
	}
	setFavState(props) {
		if(props.fav) {
			if(props.fav === true) {
				this.setState({
					favIcon:'./images/icons/fav-remove.png',
					favText:'Remove from favourites'
				});
			}
			else {
				this.setState({
					favIcon:'./images/icons/fav-add.png',
					favText:'Add to favourites'
				});
			}
		}
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
		let favTooltip = <Tooltip id={`${this.props.id}_fav`}>{this.state.favText}</Tooltip>;
		let weatherTooltip = <Tooltip id={this.props.id}>{this.props.description}</Tooltip>;
		return (
			<li className={this.getCssClass()}>
			  	<div>
			  		<OverlayTrigger overlay={closeTooltip} placement="top"delayShow={300} delayHide={150}>
			  			<span className="pull-right close-item close-item-sm close-item-w-list" aria-hidden="true" onClick={this.removeListItem}>&times;</span>
			  		</OverlayTrigger>
			  		<div>
			  			<span className="bold-italic-font font-size-small list-location-child-item">City : {this.props.cityName}</span>
			  			<span className="bold-italic-font font-size-small list-location-child-item">Country : {this.props.countryName}</span>
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
			  				<OverlayTrigger overlay={favTooltip} placement="top"delayShow={300} delayHide={150}>
			  					<img src={this.state.favIcon} onClick={this.setFav} className="go-fav" />
			  				</OverlayTrigger>
			  				<button className="btn btn-success btn-xs" onClick={this.goToPlace} 
			  				>Go to this place</button> 
			  			</div>
			  		</div>
			  	</div>
		  	</li>
		);
	}
	
}