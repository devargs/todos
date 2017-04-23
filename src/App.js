import React, { Component } from 'react';
import './App.css';
import './components/todo/styles.css';
import {TodoForm, TodoList, TodoFooter} from './components/todo';
import {generateID, addTodo} from './helpers/todoHelpers';


class App extends Component {
  state = {
      currentTodo: '',

      todos: [
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
        },
        {
          "id": 3,
          "text": "Get soda",
          "created_at": "2015-08-10T08:40:51.620Z",          
          "completed_at": "2015-08-13T08:40:51.620Z",
          "isDone": true
        },
        {
          "id": 4,
          "text": "Get cookies",
          "created_at": "2015-08-12T08:40:51.620Z"          
        },
        {
          "id": 5,
          "text": "Get butter",
          "created_at": "2015-08-14T08:40:51.620Z"          
        }
      ]
  };

  handleInputChange = (event) =>{
    this.setState({
      currentTodo: event.target.value
    });
  };

  handleEmptySumit = (event) =>{
    // Don't submit the form since the Todo is empty
    event.preventDefault();
  }

  handleSubmitTodo = (event) =>{
    // Prevent page refresh
    event.preventDefault();

    const newTodo = {
      id: generateID(),
      text: this.state.currentTodo, 
      created_at: new Date().toISOString(), 
      isDone: false
    };


    // Update existing Todos
    const updatedTodos = addTodo(newTodo, this.state.todos);
    this.setState({todos: updatedTodos, currentTodo: ''});

  };

  render() {
    return (
      <div className="todo-app">
        <header>
          <p>My Things Todo</p> 
        </header>

        <main className="content-wrapper">        
          <TodoForm 
            handleSubmit={this.state.currentTodo? this.handleSubmitTodo: this.handleEmptySumit} 
            currentTodo={this.state.currentTodo} handleInputChange={this.handleInputChange} />
          <TodoList todos={this.state.todos}/>
          <TodoFooter />        
        </main>
      </div>
    );
  }
}

export default App;
