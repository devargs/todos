import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Todos</h2>
        <form>
          <input type="text" />
        </form>
        <div>
          <ul>
            <li style={{textDecoration: 'line-through'}}>Create Repo</li>
            <li>Create Static UI</li>
            <li>Dev the real app</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
