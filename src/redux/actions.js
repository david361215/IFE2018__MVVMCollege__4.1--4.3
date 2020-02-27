import { ADD_TODO,TOGGLE_ALLTODOS_STATE,TOGGLE_TODO_STATE,CHANGE_TODO_CONTENT,DELETE_TODO,DELETE_COMPLETED_TODOS } from "./actionTypes";

export let nextTodoId = {num:0};

export const toggle_alltodos_state = ()=>{
  return{
    type:TOGGLE_ALLTODOS_STATE,
  }
}

export const addTodo = content => ({
  type:ADD_TODO,
  payload:{
    id:++nextTodoId.num,
    content,
  }
})

export const toggleTodoState = id => ({
  type:TOGGLE_TODO_STATE,
  payload:{
    id
  }
})

export const changeTodoContent = (content,id) => ({
	type:CHANGE_TODO_CONTENT,
	payload:{
		content,
		id
	}
})

export const deleteTodo = id => {
  --nextTodoId.num;
	return{
		type:DELETE_TODO,
		payload:{
			id
		}
	}
}

export const deleteCompletedTodos = () => ({
  type:DELETE_COMPLETED_TODOS,
})