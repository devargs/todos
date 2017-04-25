// Helper functions for the Todos

/**
 * Adds a Todo to a given todoList without mutating the list
 * @param todo{object}
 * @param todoList{array}
 * @returns {array} - non mutated array of Todos
 */
export const addTodo = (todo, todoList) =>{
	// It's more visible to add the item to the beginning of the list
	return [todo, ...todoList]	
}

/**
 * Generates a random ID for the Todo
 */
export const generateID = () => Math.floor(Math.random() * 100000);

/**
 * Finds the Todo by a given ID
 * @param id{number}
 * @param todos{array}
 * @returns {object} - The found Todo otherwise undefined
 */
export const findByID = (id, todos) => todos.find(todo => todo.id === id);

/**
 * Toggles the Todo's isDone flag. Updates the completed date if needed
 * @param todo {object}
 * @returns {{isDone: boolean, completed_at: string}}
 */
export const toggleTodo = (todo) =>{
	// Spread all the properties of the todo and update only what's needed
	return {...todo, 
		isDone: !todo.isDone, 
		completed_at: (todo.completed_at)? null : new Date().toISOString()
	}
};

/**
 * Updates the Todo without mutating the given Todo list.
 * @param updatedTodo
 * @param todoList
 * @returns {array} - A new array that includes the updated Todo
 */
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

/**
 * Removes the Todo from the list
 * @param id
 * @param todoList
 * @returns {array} - A new array without the Todo included
 */
export const removeTodo = (id, todoList) =>{
	const removeIndex = todoList.findIndex(todo => todo.id === id);

	return [
		...todoList.slice(0, removeIndex),
		...todoList.slice(removeIndex + 1)
	];
};

/**
 * Filter the Todos based on the route(url)
 * @param route
 * @param todos
 * @returns {*}
 */
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