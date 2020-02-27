import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import getTodosByVisibilityFilter from '../redux/selectors';
import Todo from './Todo';

// 所有待办事项列表
const TodolistSet = ({todos}) => {
  console.log(todos);
  return(
    <ul>
      { todos && todos.length ? 
        todos.map((todo)=>(<Todo key={`todo-${todo.id}`} todo={todo}/>)):
        '' }
    </ul>)
}

const mapStateToProps = (state,ownProps)=>{
  const todos = getTodosByVisibilityFilter(state,ownProps.visibilityfilter);
  return {todos};
}

const ConnectedTodolistSet = connect(mapStateToProps)(TodolistSet);

// 整个待办事项组件
class Todolist extends React.Component{
  render(){
    return(
      <div>
        <Route exact path='/' render={()=>(<ConnectedTodolistSet  visibilityfilter="all" />)} />
        <Route path='/active' render={()=>(<ConnectedTodolistSet  visibilityfilter="active" />)} />
        <Route path='/completed' render={()=>(<ConnectedTodolistSet  visibilityfilter="completed" />)} />
     </div>
    )
  }
}

export default Todolist;