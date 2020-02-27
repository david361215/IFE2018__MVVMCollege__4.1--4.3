import React from 'react';
import {connect} from 'react-redux';
import {toggle_alltodos_state,addTodo} from '../redux/actions';

import down_arrow_deep from '../image/down arrow deep.png';
import down_arrow_shadow from '../image/down arrow shadow.png';

class AddTodo extends React.Component{
  constructor(props){
    super(props);
    this.state = {content:''}    

    this.undateInput = this.undateInput.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.clickArrow = this.clickArrow.bind(this);
  }

  undateInput(content){
    this.setState({content})
  }

  handleAddTodo(e){
    if(e.keyCode === 13 && this.state.content !== ''){
      this.props.addTodo(this.state.content);
      this.setState({content:''});
    }
  }

  clickArrow(){
    this.props.toggle_alltodos_state();
  }

  render(){
    let arrowSrc = this.props.arrow ? down_arrow_deep : down_arrow_shadow ;
  	return(
	    <header>
	      <span className='arrow' onClick={this.clickArrow}>
	        <img src={arrowSrc} alt='arrow'/>
	      </span>
	      <input type='text' value={this.state.content} placeholder='What needs to be done?'
        onChange={e => {this.undateInput(e.target.value)}} onKeyDown={ e => {this.handleAddTodo(e)}}/>          
	    </header>
  	)
  }
}

const mapStateToProps = (state) => {
  if(state.todos.allIds.length===0) {
    return {arrow:false}
  }
  for(let i = 1; i < state.todos.allIds.length + 1; i++){
    if(!state.todos.byIds[i].completed){
      return{arrow:false}
    }
  }
  return {arrow:true}
}

const mapDispatchToProps = {
  toggle_alltodos_state,
  addTodo,
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTodo);