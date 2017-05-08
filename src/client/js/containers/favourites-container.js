import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ListItem from '../components/list-item';
import { searchCity, goToPlace, removeListItem, saveFav, deleteAllFav, showMobileMap } from '../actions/index';
import { listitemconfig } from '../utils/configs';

class FavouritesContainer extends Component {
	processChilds(city) {
		return (
			<ListItem key={city.id} {...city} goToPlace={this.props.goToPlace} 
			removeListItem={this.props.removeListItem} saveFav={this.props.saveFav} 
			showMobileMap={this.props.showMobileMap} />
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
				<div className="dell-all-box">
					<button className="btn btn-xs btn-danger  danger-pad"
					onClick={(e)=>{
						this.props.deleteAllFav();
					}}>Delete All Favourites</button>
				</div>
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
export default connect(mapStateToProps, {searchCity, goToPlace, 
	removeListItem, saveFav, deleteAllFav, showMobileMap})(FavouritesContainer);
