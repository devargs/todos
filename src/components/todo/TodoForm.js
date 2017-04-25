import React from 'react';
import PropTypes from 'prop-types';

export const TodoForm = (props) =>{
	return (			
		<form onSubmit={props.handleSubmit}>
			<div>				
				<input type="text" 
				onChange={props.handleInputChange} 
				placeholder="Enter things to do..."
				value={props.currentTodo} />
			</div>			
		</form>		
	)
};

// For the benefit of other Developers using components, it's always helpful
// to include the prop types, in order to use the component correctly.
// This is also good documentation
TodoForm.propTypes = {
	currentTodo: PropTypes.string.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};