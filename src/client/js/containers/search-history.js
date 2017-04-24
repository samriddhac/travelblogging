import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ListItem from '../components/list-item';
import { searchCity, goToPlace, removeListItem, saveFav, deleteAllHistory } from '../actions/index';
import { listitemconfig } from '../utils/configs';

class SearchHistory extends Component {
	
	processChilds(city) {
		return (
			<ListItem key={city.id} {...city} goToPlace={this.props.goToPlace} 
			removeListItem={this.props.removeListItem} saveFav={this.props.saveFav} />
		);
	}

	render() {
		return (
			<div id="search_history" className="tab-pane fade">
				<div className="dell-all-box">
					<button className="btn btn-xs btn-danger"
					onClick={(e)=>{
						this.props.deleteAllHistory();
					}}>Delete All Search History</button>
				</div>
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
	if(state.searchState.all){
		cities = state.searchState.all;
	}
	return {
		cities
	};
}
export default connect(mapStateToProps, {searchCity, goToPlace, 
	removeListItem, saveFav, deleteAllHistory})(SearchHistory);