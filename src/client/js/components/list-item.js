import React from 'react';

export default (props) => {

	const goToPlace = (e) => {
		props.goToPlace(props.coord);
	}

	return (
		<li className="list-group-item list-location-item rounded-border">
		  	<div>
		  		<div>
		  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">City : {props.cityName}</span>
		  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">Country : {props.countryName}</span>
		  			<span className="light-italic-font font-size-small font-color-shady list-location-child-item pull-right">{props.localTime}</span>
		  		</div>
		  		<div className="list-item-weather-container">
		  			<div className="pull-inline weather-component">
		  				<img src={`./images/icons/${props.icon}`}/>
		  				<div>
		  					<div className="light-italic-font font-size-small font-color-shady">Max temp: {props.maxTemp}&deg;C</div>
		  					<div className="light-italic-font font-size-small font-color-shady">Min temp: {props.minTemp}&deg;C</div>
		  					<div className="light-italic-font font-size-small font-color-shady">Humidity: {props.humidity}%</div>
		  				</div>
		  			</div>
		  			<div className="go-to-button pull-right">
		  				<button className="btn btn-success btn-xs" onClick={goToPlace} 
		  				>Go to this place</button>
		  			</div>
		  		</div>
		  	</div>
	  	</li>
	);
}