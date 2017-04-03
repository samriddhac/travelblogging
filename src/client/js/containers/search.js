import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from '../components/list-item';
import { searchCity, goToPlace } from '../actions/index';

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {searchterm : ''};
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(event) {
		event.preventDefault();
		if(this.state.searchterm && this.state.searchterm!=='') {
			this.props.searchCity(this.state.searchterm);
			this.setState({ searchterm: '' });
		}
	}

	onInputChange(e) {
		this.setState({ searchterm: e.target.value });
	}

	processChilds(city) {
		return (
			<ListItem key={city.id} {...city} goToPlace={this.props.goToPlace} />
		);
	}

	render() {
		return (
			<div id="search" className="tab-pane fade in active">
			<form onSubmit={this.onFormSubmit}>
			  	<div className="form-group search-container">
			  		<input type="text"
			  		value={this.state.searchterm}
			  		onChange={(e)=>{ this.onInputChange(e) }} 
			  		className="form-control text-input-search" 
			  		placeholder="Search" />
			  		<button className="btn btn-default btn-md pull-right">Search</button>
			  	</div>
		  	</form>
		    <ul className="list-group bg-dusky">
			 	{this.props.cities.map(this.processChilds.bind(this))}	
			</ul>
		  </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		cities:state.searchState.current
	};
}
export default connect(mapStateToProps, {searchCity, goToPlace})(Search);