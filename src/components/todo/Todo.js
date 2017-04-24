import React from 'react';
import FaSquareO from 'react-icons/lib/fa/square-o';
import FaCheckSquare from 'react-icons/lib/fa/check-square';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import PropTypes from 'prop-types';

export const Todo = (todo) => {	
	const handleToggle = todo.handleToggle.bind(null, todo.id);
	const handleRemove = todo.handleRemoveTodo.bind(null, todo.id);

	return (
		<li className="todo">
			{todo.isDone? 
				<FaCheckSquare onClick={handleToggle} className="todo-checkbox" /> : <FaSquareO onClick={handleToggle} className="todo-checkbox" /> }
			<p className={todo.isDone? "done-task" : ""}>
				{todo.text} 				
				<span className="remove-todo" onClick={handleRemove}><FaTrashO /></span>
			</p>
			
			{ todo.completed_at && <p className="completed-at">Completed: {new Date(todo.completed_at).toDateString()}</p>}
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