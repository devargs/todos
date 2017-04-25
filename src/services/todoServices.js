// From the API at http://docs.todoapp10.apiary.io/#reference/0/get-list-of-to-do-items
// Using json-server to locally save the Todos

const url = 'http://localhost:3001/to-do';

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