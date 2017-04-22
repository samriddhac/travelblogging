import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ListItem from '../components/list-item';
import { searchCity, goToPlace, removeListItem, saveFav } from '../actions/index';
import { listitemconfig } from '../utils/configs';

class FavouritesContainer extends Component {
	processChilds(city) {
		return (
			<ListItem key={city.id} {...city} goToPlace={this.props.goToPlace} 
			removeListItem={this.props.removeListItem} saveFav={this.props.saveFav} />
		);
	}

	render() {
		return (
			<div id="favs" className="tab-pane fade">
			    <ul className="list-group bg-dusky list-location-container">
			    	<ReactCSSTransitionGroup {...listitemconfig}>
				 		{this.props.cities.map(this.processChilds.bind(this))}	
				 	</ReactCSSTransitionGroup>
				</ul>
		  	</div>
		);
	}
}
function mapStateToProps(state) {
	let cities =[];
	if(state.searchState.fav){
		cities = state.searchState.fav;
	}
	return {
		cities
	};
}
export default connect(mapStateToProps, {searchCity, goToPlace, removeListItem, saveFav})(FavouritesContainer);
