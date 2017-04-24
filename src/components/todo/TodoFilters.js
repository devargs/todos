import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TodoFilters extends Component{
	render(){
		return(
			<nav className="todo-filters">
				<a className={this.props.location === '/' && 'active'} onClick={this.props.handleFilterClick} href="/">All</a>
				<a className={this.props.location === '/completed' && 'active'} onClick={this.props.handleFilterClick} href="/completed">Completed</a>
				<a className={this.props.location === '/not-done' && 'active'} onClick={this.props.handleFilterClick} href="/not-done">Not done</a>			
			</nav>
		)
	}	
}

// For the benefit of other Developers using components, it's always helpful
// to include the prop types, in order to use the component correctly.
// This is also good documentation
TodoFilters.propTypes = {
	location: PropTypes.string.isRequired,
	handleFilterClick: PropTypes.func	
};