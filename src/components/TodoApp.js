import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import VisibilityFilter from './VisibilityFilters';
import {BrowserRouter as Router} from 'react-router-dom';


import '../style.css';

export default ()=>(
  <Router>
	  <div className='todo'> 
	    <AddTodo/>
	    <TodoList/>
	    <VisibilityFilter/>
	  </div>
  </Router>
)

