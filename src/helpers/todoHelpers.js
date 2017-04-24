// Helper functions for the Todos

export const addTodo = (todo, todoList) =>{
	// It's more visible to add the item to the beginning of the list
	return [todo, ...todoList]	
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

// Filter the Todos based on the route(url)
export const filterTodos = (route, todos) =>{
	switch(route){
		case '/completed':
			return todos.filter(todo => todo.isDone);			
		case '/not-done':
			return todos.filter(todo => !todo.isDone);
		default:
			return todos;
	}

}