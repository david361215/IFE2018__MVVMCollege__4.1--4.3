import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import getTodosByVisibilityFilter from '../redux/selectors';
import {deleteCompletedTodos} from '../redux/actions';

class TodolistFooter extends React.Component{
	constructor(props){
		super(props);
		this.state={
			changeStyle:'all'
		}
	}
  render(){
    let {completed,active,deleteCompletedTodos} = this.props; 
    let style = (active.length + completed.length === 0 ) ? { display:'none'} : {display:'block' };
    let uncompletedNum = (active.length === 1) ? ('1 item' + ' ') : (active.length + ' ' + 'items' + ' ');
    let clearCompletedStyle = (completed.length > 0 ? {display:'block'} : {display:'none'});
    return(
      <footer style={style}>
        <p className='uncompletedNum'><span>{uncompletedNum}</span>left</p>
        <p className='visibilityfilter' >
          <li>
            <Link to='/' className= {('all'===this.state.changeStyle)? 'focus' :''} onClick={()=>{this.setState({changeStyle:'all'})}}>All</Link>
          </li>
          <li>
            <Link to='/active' className= {('active'===this.state.changeStyle)? 'focus' :''} onClick={()=>{this.setState({changeStyle:'active'})}}>Active</Link>
          </li>
          <li>
            <Link to='/completed' className= {('completed'===this.state.changeStyle)? 'focus' :''} onClick={()=>{this.setState({changeStyle:'completed'})}}>Completed</Link>
          </li>
        </p>
        <p className='clearCompleted' style={clearCompletedStyle} onClick={deleteCompletedTodos} >Clear completed</p>
      </footer>
    )
  }
}

const mapStateToProps = state => (
  {
  	active:getTodosByVisibilityFilter(state,'active'),
    completed:getTodosByVisibilityFilter(state,'completed')
  }
)

export default connect(mapStateToProps,{deleteCompletedTodos})(TodolistFooter);