import React from 'react';
import {Todo} from './Todo';
import PropTypes from 'prop-types';

export const TodoList = (props) => {
	return(		
		<ul>		
			{props.todos.map( todo => <Todo key={todo.id} {...todo}/> )}
	    </ul>
	);
};

// For the benefit of other Developers using components, it's always helpful
// to include the prop types, in order to use the component correctly.
// This is also good documentation
TodoList.propTypes = {
	todos: PropTypes.array.isRequired
};