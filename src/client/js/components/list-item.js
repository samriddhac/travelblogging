import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MOBILE_VIEW_MAP } from '../common/constants';

export default class ListItem extends Component {

	constructor(props) {
		super(props);
		this.goToPlace = this.goToPlace.bind(this);
		this.removeListItem = this.removeListItem.bind(this);
		this.getCssClass = this.getCssClass.bind(this);
		this.setFav = this.setFav.bind(this);
		this.setFavState = this.setFavState.bind(this);
		if(props.fav===undefined){
			this.state = {
				favIcon:'./images/icons/fav-add.png',
				favText:'Add to favourites'
			}
		}
		else {
			if(props.fav === true) {
				this.state = {
					favIcon:'./images/icons/fav-remove.png',
					favText:'Remove from favourites'
				};
			}
			else if(props.fav === false) {
				this.state = {
					favIcon:'./images/icons/fav-add.png',
					favText:'Add to favourites'
				};
			}
		}
	}
	componentWillReceiveProps(newProps) {
		this.setFavState(newProps);
	}
	goToPlace(e) {
		this.props.changeMobileView(MOBILE_VIEW_MAP);
		this.props.goToPlace(this.props.id, this.props.cityName, this.props.coord);
	}
	setFav(e) {
		if(this.props.fav && this.props.fav === true) {
			this.props.saveFav(this.props.id, false);
		}
		else {
			this.props.saveFav(this.props.id, true);
		}
	}
	setFavState(props) {
		if(props.fav!==undefined) {
			if(props.fav === true) {
				this.setState({
					favIcon:'./images/icons/fav-remove.png',
					favText:'Remove from favourites'
				});
			}
			else if(props.fav === false) {
				this.setState({
					favIcon:'./images/icons/fav-add.png',
					favText:'Add to favourites'
				});
			}
		}
		else {
			this.setState({
				favIcon:'./images/icons/fav-add.png',
				favText:'Add to favourites'
			});
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
			  			<span className="bold-italic-font font-size-small list-location-child-item">Place : {this.props.place}</span>
			  			<span className="light-italic-font font-size-small font-color-shady list-location-child-item pull-right">{this.props.localTime}</span>
			  		</div>
			  		<div className="list-item-weather-container">
			  			<div className="pull-inline weather-component">
			  				<OverlayTrigger overlay={weatherTooltip} placement="top"delayShow={300} delayHide={150}>
			  					<img src={`./images/icons/${this.props.icon}`}/>
			  				</OverlayTrigger>
			  				<div>
			  					<div className="light-italic-font font-size-small font-color-shady">Temp: {this.props.temp}&deg;C</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Dew point: {this.props.dewpoint}&deg;C</div>
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