// Unit Tests for the Todos helper functions

import {addTodo, findByID, toggleTodo, updateTodo, removeTodo, filterTodos, toggleAll} from './todoHelpers';


test('Should add a Todo to the list', () =>{
	// The initial list of Todos
	const todos = [
		{
          "id": 0,
          "text": "Get milk",
          "created_at": "2015-08-05T08:40:51.620Z",
          "completed_at": "2015-08-06T08:40:51.620Z",
          "isDone": true
        },
        {
          "id": 1,
          "text": "Get eggs",
          "created_at": "2015-08-06T08:40:51.620Z"          
        },
        {
          "id": 2,
          "text": "Get bread",
          "created_at": "2015-08-08T08:40:51.620Z",
          "completed_at": "2015-08-08T08:40:51.620Z",
          "isDone": true
        }
    ];

    // The new Todo
    const date = new Date().toISOString();
    const newTodo = {id: 3, text: "Get cheetos", isDone: false, created_at: date}

    // The expected Todos list
    const expectedTodosList = [
      {id: 3, text: "Get cheetos", isDone: false, created_at: date},
    	{
          "id": 0,
          "text": "Get milk",
          "created_at": "2015-08-05T08:40:51.620Z",
          "completed_at": "2015-08-06T08:40:51.620Z",
          "isDone": true
        },
        {
          "id": 1,
          "text": "Get eggs",
          "created_at": "2015-08-06T08:40:51.620Z"          
        },
        {
          "id": 2,
          "text": "Get bread",
          "created_at": "2015-08-08T08:40:51.620Z",
          "completed_at": "2015-08-08T08:40:51.620Z",
          "isDone": true
        }        
    ];
    // Add the Todo
    const result = addTodo(newTodo, todos);

    // Expect the new Todo to be added without mutating the initial 'todo' list
    expect(result).toEqual(expectedTodosList)
    expect(result).not.toBe(expectedTodosList)
});

test('Should find the Todo by ID', () =>{
	const todos = [
		{
          "id": 0,
          "text": "Get milk",
          "created_at": "2015-08-05T08:40:51.620Z",
          "completed_at": "2015-08-06T08:40:51.620Z",
          "isDone": true
        },
        {
          "id": 1,
          "text": "Get eggs",
          "created_at": "2015-08-06T08:40:51.620Z"          
        },
        {
          "id": 2,
          "text": "Get bread",
          "created_at": "2015-08-08T08:40:51.620Z",
          "completed_at": "2015-08-08T08:40:51.620Z",
          "isDone": true
        }
    ];

    const expectedTodo = {
          "id": 2,
          "text": "Get bread",
          "created_at": "2015-08-08T08:40:51.620Z",
          "completed_at": "2015-08-08T08:40:51.620Z",
          "isDone": true
        }

    const result = findByID(2, todos);

    expect(result).toEqual(expectedTodo);
});

test('Toggle Todo should toogle the "isDone" flag and have "completed_at" as null.', () =>{
	const date = new Date().toISOString();

	 const todo = {
	  "id": 2,
	  "text": "Get bread",
	  "created_at": "2015-08-08T08:40:51.620Z",
	  "completed_at": date,
	  "isDone": true
	 }

	 const expectedTodo = {
	  "id": 2,
	  "text": "Get bread",
	  "created_at": "2015-08-08T08:40:51.620Z",
	  "completed_at": null,
	  "isDone": false
	}

	const result = toggleTodo(todo);

	expect(result).toEqual(expectedTodo);

	// Make sure is not a reference to the same todo object
	expect(result).not.toBe(todo);
});

test('Should update the Todo by ID', () =>{
	const todos = [
		{
          "id": 0,
          "text": "Get milk",
          "created_at": "2015-08-05T08:40:51.620Z",
          "completed_at": "2015-08-06T08:40:51.620Z",
          "isDone": true
        },
        {
          "id": 1,
          "text": "Get eggs",
          "created_at": "2015-08-06T08:40:51.620Z"          
        },
        {
          "id": 2,
          "text": "Get bread",
          "created_at": "2015-08-08T08:40:51.620Z",
          "completed_at": "2015-08-08T08:40:51.620Z",
          "isDone": true
        }
    ];

    const date = new Date().toISOString();

    const updatedTodo = {
      "id": 1,
      "text": "Get eggs",
      "created_at": "2015-08-06T08:40:51.620Z",
      "isDone": true,
      "completed_at": date          
    };

    const expectedTodoList = [
		{
          "id": 0,
          "text": "Get milk",
          "created_at": "2015-08-05T08:40:51.620Z",
          "completed_at": "2015-08-06T08:40:51.620Z",
          "isDone": true
        },
        {
          "id": 1,
          "text": "Get eggs",
          "created_at": "2015-08-06T08:40:51.620Z",
          "isDone": true,
      	  "completed_at": date          
        },
        {
          "id": 2,
          "text": "Get bread",
          "created_at": "2015-08-08T08:40:51.620Z",
          "completed_at": "2015-08-08T08:40:51.620Z",
          "isDone": true
        }
    ];

    const result = updateTodo(updatedTodo, todos);

    expect(result).toEqual(expectedTodoList);

    // Make sure is not a reference to the same Todos array
    expect(result).not.toBe(expectedTodoList);
});


test('Should remove the Todo but without mutating the array.', () =>{
	const todos = [
		{
	      "id": 0,
	      "text": "Get milk",
	      "created_at": "2015-08-05T08:40:51.620Z",
	      "completed_at": "2015-08-06T08:40:51.620Z",
	      "isDone": true
	    },
	    {
	      "id": 1,
	      "text": "Get eggs",
	      "created_at": "2015-08-06T08:40:51.620Z"          
	    },
	    {
	      "id": 2,
	      "text": "Get bread",
	      "created_at": "2015-08-08T08:40:51.620Z",
	      "completed_at": "2015-08-08T08:40:51.620Z",
	      "isDone": true
	    }
	];

	const removeID = 2;

	const expectedTodoList = [
		{
	      "id": 0,
	      "text": "Get milk",
	      "created_at": "2015-08-05T08:40:51.620Z",
	      "completed_at": "2015-08-06T08:40:51.620Z",
	      "isDone": true
	    },
	    {
	      "id": 1,
	      "text": "Get eggs",
	      "created_at": "2015-08-06T08:40:51.620Z"          
	    }
	];

	const result = removeTodo(removeID, todos);

	expect(result).toEqual(expectedTodoList);

	// Make sure it is not a reference to the same todos array
	expect(result).not.toBe(todos);

});


test('Should filter the Todos based on the route(url)', () =>{
  const todos = [
      {
        "id": 0,
        "text": "Get milk",
        "created_at": "2015-08-05T08:40:51.620Z",
        "completed_at": "2015-08-06T08:40:51.620Z",
        "isDone": true
      },
      {
        "id": 1,
        "text": "Get eggs",
        "created_at": "2015-08-06T08:40:51.620Z"          
      },
      {
        "id": 2,
        "text": "Get bread",
        "created_at": "2015-08-08T08:40:51.620Z",
        "completed_at": "2015-08-08T08:40:51.620Z",
        "isDone": true
      }
  ];

  const completedTodos = [
      {
        "id": 0,
        "text": "Get milk",
        "created_at": "2015-08-05T08:40:51.620Z",
        "completed_at": "2015-08-06T08:40:51.620Z",
        "isDone": true
      },
      {
        "id": 2,
        "text": "Get bread",
        "created_at": "2015-08-08T08:40:51.620Z",
        "completed_at": "2015-08-08T08:40:51.620Z",
        "isDone": true
      }
  ];

  const notDoneTodos = [
      {
        "id": 1,
        "text": "Get eggs",
        "created_at": "2015-08-06T08:40:51.620Z"          
      }
  ];

  const allTodos = [
      {
        "id": 0,
        "text": "Get milk",
        "created_at": "2015-08-05T08:40:51.620Z",
        "completed_at": "2015-08-06T08:40:51.620Z",
        "isDone": true
      },
      {
        "id": 1,
        "text": "Get eggs",
        "created_at": "2015-08-06T08:40:51.620Z"          
      },
      {
        "id": 2,
        "text": "Get bread",
        "created_at": "2015-08-08T08:40:51.620Z",
        "completed_at": "2015-08-08T08:40:51.620Z",
        "isDone": true
      }
  ];

  const completed = filterTodos('/completed', todos);
  expect(completed).toEqual(completedTodos);

  const notDone = filterTodos('/not-done', todos);
  expect(notDone).toEqual(notDoneTodos);

  const all = filterTodos('/', todos);
  expect(all).toEqual(allTodos);  

});