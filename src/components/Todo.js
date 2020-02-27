import React from 'react';
import {connect} from 'react-redux';
import {toggleTodoState,changeTodoContent,deleteTodo} from '../redux/actions';

import complete from '../image/complete.png';
import cancel from '../image/cancel.png';

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      focusInput:false,
      displayCancel:false,
    }

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.doubleClickInput = this.doubleClickInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changeState = this.changeState.bind(this);
    this.visibility = this.visibility.bind(this);
  }

  // 鼠标滑入todo事项区域
  mouseOver(){
    if(!this.state.focusInput){
      this.setState({
        displayCancel:true,
      })
    }
  }

  // 鼠标滑出todo事项区域
  mouseOut(){
    if(!this.state.focusInput){
      this.setState({
        displayCancel:false,
      })
    }
  }

  // 鼠标双击输入框遮罩，输入框获得焦点
  doubleClickInput(e){
    this.setState({
      focusInput:true,
      displayCancel:false,
    })
    e.target.nextSibling.focus();
  }
  // 输入框失去焦点，如果输入框没有内容，删除该事项
  blurInput(e){
    this.setState({
      focusInput:false,
    })
    if(e.target.value.length === 0){
      this.props.deleteTodo(this.props.todo.id);
    }
  }
  // 输入框接受输入，修改内容
  changeContent(e){
    this.props.changeTodoContent(e.target.value, this.props.todo.id)
  }
  // 鼠标单击圆框区域，修改状态
  changeState(){
    this.props.toggleTodoState(this.props.todo.id);
  }
  // 返回style属性的值
  visibility(boolen){
    if(boolen){
      return{visibility:'visible'}
    }else{
      return{visibility:'hidden'}
    }
  }
  render(){
    let inputClassName= this.state.focusInput? 'inputfocus': (this.props.todo.completed?'completed':'');
    let maskStyle = this.state.focusInput? {zIndex:-1}:{zIndex:0};
    return(
      <li onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
        <span className='state' onClick={this.changeState} style={this.visibility(!this.state.focusInput)}>
          <img src={complete} alt='complete' style={this.visibility(!this.state.focusInput && this.props.todo.completed)}/>
        </span>
        <p className='mask' onDoubleClick={this.doubleClickInput} style={maskStyle}></p>
        <input type='text' value={this.props.todo.content} className={inputClassName} onBlur={this.blurInput} onChange={this.changeContent}/>
        <span className='cancel' onClick={()=>{this.props.deleteTodo(this.props.todo.id)}} style={this.visibility(this.state.displayCancel)}>
          <img src={cancel} alt='cancel'/>
        </span>
      </li>
    )
  }
}

export default connect(null,{changeTodoContent,toggleTodoState,deleteTodo})(Todo);