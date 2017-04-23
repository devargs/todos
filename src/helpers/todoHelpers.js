// Helper functions for the Todos

export const addTodo = (todo, todoList) =>{
	// Don't mutate the todoLIst but create a new list
	return todoList.concat(todo);

	// An alternative would be to spread the list and add the item at the end
	// [...todoList, item]	
}

export const generateID = () => Math.floor(Math.random() * 100000);

export const findByID = (id, todos) => todos.find(todo => todo.id === id);

export const toggleTodo = (todo) =>{
	// Spread all the properties of the todo and update only what's needed
	return {...todo, 
		isDone: !todo.isDone, 
		completed_at: (todo.completed_at)? null : new Date().toISOString()
	}
};

export const updateTodo = (updatedTodo, todoList) =>{	
	const updatedIndex = todoList.findIndex(todo => todo.id === updatedTodo.id);

	return [
		// All the Todos before
		...todoList.slice(0, updatedIndex),
		updatedTodo,
		// All the Todos after
		...todoList.slice(updatedIndex + 1)
	];

};

export const removeTodo = (id, todoList) =>{
	const removeIndex = todoList.findIndex(todo => todo.id === id);

	return [
		...todoList.slice(0, removeIndex),
		...todoList.slice(removeIndex + 1)
	];
};