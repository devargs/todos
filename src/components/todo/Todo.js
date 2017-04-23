import React from 'react';
import FaSquareO from 'react-icons/lib/fa/square-o';
import FaCheckSquare from 'react-icons/lib/fa/check-square';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import PropTypes from 'prop-types';

export const Todo = (todo) => {
	return (
		<li className="todo">
			{todo.isDone? <FaCheckSquare className="todo-checkbox" /> : <FaSquareO className="todo-checkbox" /> }
			<p className={todo.isDone? "done-task" : ""}>
				{todo.text} 				
				<span className="remove-todo"><FaTrashO /></span>
			</p>
			
			{ todo.completed_at && <p className="completed-at">Done: {new Date(todo.completed_at).toDateString()}</p>}
		</li>
	)
};

// For the benefit of other Developers using components, it's always helpful
// to include the prop types, in order to use the component correctly.
// This is also good documentation
Todo.propTypes = {
	isDone: PropTypes.bool,
	text: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired
};