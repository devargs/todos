import React from 'react';
import PropTypes from 'prop-types';

export const TodoFooter = (props) =>{
	let pages = [];	

	for(let i = 0; i < props.totalPages; i++){
		pages.push(
			<span key={i+1} 
				  className={(props.currentPage === i+1) && "active"}
				  onClick={props.handlePagination} >{i+1}</span>
		);
	}

	return (
		<footer className="pagination">
			{pages.map( page => page)}
		</footer>
	);
};

// For the benefit of other Developers using components, it's always helpful
// to include the prop types, in order to use the component correctly.
// This is also good documentation
TodoFooter.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	handlePagination: PropTypes.func.isRequired	
};