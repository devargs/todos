import React, { Component } from 'react';
import './App.css';
import './components/todo/styles.css';
import {TodoForm, TodoList, TodoFilters, TodoFooter} from './components/todo';
import {generateID, addTodo, findByID, toggleTodo, updateTodo, removeTodo, filterTodos} from './helpers/todoHelpers';
import {getTodos, createTodo, saveTodo, deleteTodo} from './services/todoServices';


class App extends Component {
  state = {
      currentTodo: '',
      currentPath: '/',      
      todos: []
  };

  // Load the Todos when the component is mounted
  componentDidMount(){
    getTodos().then(todos => this.setState({todos: todos, currentPath: document.location.pathname}));
  }

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

    // Create Todo in the server
    createTodo(newTodo);
  };

  handleToggle = (id) =>{
    const selectedTodo = findByID(id, this.state.todos);
    const updatedTodo = toggleTodo(selectedTodo);
    const updatedTodoList = updateTodo(updatedTodo, this.state.todos);

    this.setState({todos: updatedTodoList});

    // Save Todo in the server
    saveTodo(updatedTodo);
  };

  handleRemoveTodo = (id) =>{
    const updatedTodos = removeTodo(id, this.state.todos);

    this.setState({todos: updatedTodos});

    // Delete Todo from the server
    deleteTodo(id);
  };

  handleFilterClick = (event) =>{
    event.preventDefault();
    history.pushState(null, '', event.target.getAttribute('href'));

    // Update current path
    this.setState({currentPath: document.location.pathname});            
  };

  render() {
    // Display the Todos based on the current route
    const filteredTodoList = filterTodos(this.state.currentPath, this.state.todos);

    return (
      <div className="todo-app">
        <header>
          <p>My Things Todo</p> 
        </header>

        <main className="content-wrapper">        
          <TodoForm 
            handleSubmit={this.state.currentTodo? this.handleSubmitTodo: this.handleEmptySumit} 
            currentTodo={this.state.currentTodo} handleInputChange={this.handleInputChange} />
          <TodoFilters handleFilterClick={this.handleFilterClick} location={this.state.currentPath} />  
          <TodoList todos={filteredTodoList} 
            handleToggle={this.handleToggle}
            handleRemoveTodo={this.handleRemoveTodo} />
          <TodoFooter />        
        </main>
      </div>
    );
  }
}

export default App;
