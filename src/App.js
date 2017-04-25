import React, {Component} from 'react';
import './components/todo/styles.css';
import {TodoForm, TodoList, TodoFilters, TodoFooter} from './components/todo';
import {generateID, addTodo, findByID, toggleTodo, updateTodo, removeTodo, filterTodos} from './helpers/todoHelpers';
import {getTodos, createTodo, saveTodo, deleteTodo} from './services/todoServices';


class App extends Component {
    state = {
        currentTodo: '',
        currentPath: '/',
        currentPage: 1,
        totalPages: 1,
        maxLimit: 10,
        todos: []
    };

    // Load the Todos when the component is mounted
    componentDidMount() {
        getTodos().then(todos => {
            // Create Todos by page
            let totalPages = Math.ceil(todos.length / this.state.maxLimit);
            for (let i = 0, page = 1; page <= totalPages; i += this.state.maxLimit, page++) {
                let pageTodo = {};
                pageTodo[`todos_${page}`] = todos.slice(i, (i + 1) * this.state.maxLimit);
                this.setState(pageTodo);
            }

            // Update the state's currentPath and totalPages
            // Default Todos to the first page
            this.setState({todos: this.state.todos_1, currentPath: document.location.pathname, totalPages: totalPages});
        });
    }

    /**
     * Keeps track of changes in the Todo input box
     * @param event{object}
     */
    handleInputChange = (event) => {
        this.setState({
            currentTodo: event.target.value
        });
    };

    /**
     * Prevents submitting empty Todos
     * @param event{object}
     */
    handleEmptySumit = (event) => {
        event.preventDefault();
    }

    /**
     * Handles the submission of the Todo form. Persists the Todo in the server
     * @param event{object}
     */
    handleSubmitTodo = (event) => {
        // Prevent page refresh
        event.preventDefault();

        const newTodo = {
            id: generateID(),
            text: this.state.currentTodo,
            created_at: new Date().toISOString(),
            isDone: false
        };

        // Add Todo to current page or the next page if needed
        const lastPageTodos = this.state[`todos_${this.state.totalPages}`];
        if (lastPageTodos.length < 10) {
            const updatedTodos = addTodo(newTodo, this.state[`todos_${this.state.totalPages}`]);

            // Update state
            let updates = {currentTodo: ''};
            updates[`todos_${this.state.totalPages}`] = updatedTodos;
            this.setState(updates);
        } else {
            // Create new page for Todos
            const updatedTodos = addTodo(newTodo, []);
            let updates = {currentTodo: '', totalPages: this.state.totalPages + 1};
            updates[`todos_${this.state.totalPages + 1}`] = updatedTodos;
            this.setState(updates);
        }

        // For visibility, in case the Todo gets added in a new page
        // Move to the page where the Todo gets added
        this.setState((prevState) => {
            return {currentPage: prevState.totalPages, todos: prevState[`todos_${prevState.totalPages}`]}
        });

        // Create Todo in the server
        createTodo(newTodo);
    };

    /**
     * Handles the toggle event when clicking to toggle a Todo. Persists the changes in the server.
     * @param id{number}
     */
    handleToggle = (id) => {
        const selectedTodo = findByID(id, this.state.todos);
        const updatedTodo = toggleTodo(selectedTodo);
        const updatedTodoList = updateTodo(updatedTodo, this.state.todos);

        // Update the state for the Todos in that page
        const updates = {todos: updatedTodoList};
        updates[`todos_${this.state.currentPage}`] = updatedTodoList;
        this.setState(updates);

        // Save Todo in the server
        saveTodo(updatedTodo);
    };

    /**
     * Handles removing the Todo. Persists the changes in the server.
     * @param id
     */
    handleRemoveTodo = (id) => {
        // Remove the Todo from the current page
        const updatedTodos = removeTodo(id, this.state[`todos_${this.state.currentPage}`]);

        const stateUpdates = {};
        // Remove the page if there's no Todos in it
        if (updatedTodos.length === 0 && this.state.totalPages > 1) {
            stateUpdates.totalPages = this.state.totalPages - 1;
            stateUpdates.currentPage = this.state.totalPages - 1;
        }

        // Update the current page Todos
        stateUpdates[`todos_${this.state.currentPage}`] = updatedTodos;
        this.setState(stateUpdates);
        this.setState(prevState => {
            return {todos: prevState[`todos_${prevState.currentPage}`]}
        });

        // Delete Todo from the server
        deleteTodo(id);
    };

    /**
     * Handles clicking on the filters(All, Completed, Not Done) and updates the state
     * @param event
     */
    handleFilterClick = (event) => {
        event.preventDefault();
        history.pushState(null, '', event.target.getAttribute('href'));

        // Update current path
        this.setState({currentPath: document.location.pathname});
    };

    /**
     * Handles page navigation
     * @param event
     */
    handlePagination = (event) => {
        const page = event.target.innerHTML
        this.setState({todos: this.state[`todos_${page}`], currentPage: page});
    };

    /**
     * Renders the Todo Application and updates the state of the app as needed.
     * @returns {JSX} - The Todos application
     */
    render() {
        // Filter the Todos based on the current route
        const filteredTodoList = filterTodos(this.state.currentPath, this.state.todos);

        return (
            <div className="todo-app">
                <header>
                    <p>My Things Todo</p>
                </header>

                <main className="content-wrapper">
                    <TodoForm
                        handleSubmit={this.state.currentTodo ? this.handleSubmitTodo : this.handleEmptySumit}
                        currentTodo={this.state.currentTodo} handleInputChange={this.handleInputChange}/>
                    <TodoFilters handleFilterClick={this.handleFilterClick} location={this.state.currentPath}/>
                    <TodoList todos={filteredTodoList}
                              handleToggle={this.handleToggle}
                              handleRemoveTodo={this.handleRemoveTodo}/>
                    <TodoFooter
                        currentPage={parseInt(this.state.currentPage, 10)}
                        totalPages={parseInt(this.state.totalPages, 10)}
                        handlePagination={this.handlePagination}/>
                </main>
            </div>
        );
    }
}

export default App;
