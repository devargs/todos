# Todos Application

### Installation
Requires `git` and `npm` to be installed already.

1. Clone the repo go into the `todos` directory
```sh
$ git clone https://github.com/devargs/todos.git
$ cd todos
```
2. Install and run `json-server` to work locally with the API.
```sh
$ npm install -g json-server
$ json-server -p 3001 --watch db.json
```
3. Install all dependencies and start the application.
```sh
$ cd path_to/todos
$ npm install
$ npm start
```