const url = 'http://localhost:3001/todos';

export const getTodos = () =>{
	return fetch(url).then( (respoonse) => respoonse.json());
}

export const createTodo = (todo) =>{
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todo)
	}).then(response => response.json());
};

export const saveTodo = (todo) =>{	
	return fetch(`${url}/${todo.id}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todo)
	}).then(response => response.json());
};

export const deleteTodo = (id) =>{	
	return fetch(`${url}/${id}`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
};