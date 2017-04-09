import React, { Component } from 'react';

class SearchHistory extends Component {
	render() {
		return (
			<div id="search_history" className="tab-pane fade">
		    <ul className="list-group bg-dusky list-location-container">
			  <li className="list-group-item list-location-item rounded-border">
			  	<div>
			  		<div>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">City : New York</span>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">Country : United States</span>
			  			<span className="light-italic-font font-size-small font-color-shady list-location-child-item pull-right">07:34:00AM</span>
			  		</div>
			  		<div className="list-item-weather-container">
			  			<div className="pull-inline weather-component">
			  				<img src="./icons/m-cloudy.gif"/>
			  				<div>
			  					<div className="light-italic-font font-size-small font-color-shady">Max temp: 29F</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Min temp: 29F</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Humidity: 34%</div>
			  				</div>
			  			</div>
			  			<div className="go-to-button pull-right">
			  				<a className="btn btn-success btn-xs" href="">Go to this place</a>
			  			</div>
			  		</div>
			  	</div>
			  </li>
			  <li className="list-group-item list-location-item rounded-border">
			  	<div>
			  		<div>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">City : San Fransisco</span>
			  			<span className="bold-italic-font font-size-small font-color-blue list-location-child-item">Country : United States</span>
			  			<span className="light-italic-font font-size-small font-color-shady list-location-child-item pull-right">07:34:00AM</span>
			  		</div>
			  		<div className="list-item-weather-container">
			  			<div className="pull-inline weather-component">
			  				<img src="./icons/m-c-rain.gif"/>
			  				<div>
			  					<div className="light-italic-font font-size-small font-color-shady">Max temp: 40F</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Min temp: 29F</div>
			  					<div className="light-italic-font font-size-small font-color-shady">Humidity: 84%</div>
			  				</div>
			  			</div>
			  			<div className="go-to-button pull-right">
			  				<a className="btn btn-success btn-xs" href="">Go to this place</a>
			  			</div>
			  		</div>
			  	</div>
			  </li>
			</ul>
		  </div>
		);
	}
}

export default SearchHistory;