import React from 'react';
import FeedbackContainer from '../containers/feed-container';
import FavouritesContainer from '../containers/favourites-container';
import Search from '../containers/search';
import SearchHistory from '../containers/search-history';

export default (props) => {
	return(
		<div className="col-md-4 bg-dusky">
			<ul className="nav nav-pills">
			  <li className="active"><a data-toggle="tab" href="#search">Search</a></li>
			  <li><a data-toggle="tab" href="#search_history">Search History</a></li>
			  <li><a data-toggle="tab" href="#favs">Favourites</a></li>
			</ul>
			<div className="tab-content">
			  <Search />
			  <SearchHistory />
			  <FavouritesContainer />
			</div>
		</div>
	);
}