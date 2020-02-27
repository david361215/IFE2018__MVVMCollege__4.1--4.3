import { ADD_TODO,TOGGLE_ALLTODOS_STATE,TOGGLE_TODO_STATE,CHANGE_TODO_CONTENT,DELETE_TODO,DELETE_COMPLETED_TODOS } from "../actionTypes";
import { nextTodoId } from "../actions";

const initialState = {
  allIds:[],
  byIds:{},
}

export default function(state = initialState, action){
  switch(action.type){
    case ADD_TODO:{
      const{id,content} = action.payload;
      console.log(id);
      return{
        ...state,
        allIds:[...state.allIds,id],
        byIds:{
          ...state.byIds,
          [id]:{
            content,
            completed:false,
          }
        }
      }
    }

    case TOGGLE_TODO_STATE:{
      const {id} = action.payload;
      return{
        ...state,
        byIds:{
          ...state.byIds,
          [id]:{
            ...state.byIds[id],
            completed:!state.byIds[id].completed
          }
        }
      }
    }
    case CHANGE_TODO_CONTENT:{
      const { content,id } = action.payload;
      return{
        ...state,
        byIds:{
          ...state.byIds,
          [id]:{
            ...state.byIds[id],
            content
          }
        }
      }
    }
    // 点击箭头，切换所有待办事项状态的逻辑是这样的：
    // 如果至少有一个未完成，则将全部待办事项状态改为已完成
    // 如果全部完成，则将全部状态改为未完成
    case TOGGLE_ALLTODOS_STATE:{
      let obj = {...state.byIds};
      for(let i = 1; i < state.allIds.length + 1; i++ ){
        if(!state.byIds[i].completed){
          for(let id in obj){
            obj[id].completed = true;
          }
          return{
            ...state,
            byIds:obj
          }
        }
      }
      for(let id in obj){
        obj[id].completed = false;
      }
      return{
        ...state,
        byIds:obj
      }
    }

    case DELETE_TODO:{

      const {id} = action.payload;
      const allIds = state.allIds.slice(0, state.allIds.length - 1);
      let obj = {...state.byIds};
      delete obj[id];
      const length = allIds.length + 1;
      for(let i = 0; i < length - id; i++){
        obj[id+i] = obj[id+i+1];
      }
      delete obj[length];
      return{
        ...state,
        allIds,
        byIds:obj,
      }
    }

    case DELETE_COMPLETED_TODOS:{
      let obj = {...state.byIds};
      let allIds = [];
      let newId = 1;
      let length = state.allIds.length;
      // 删除byIds中已完成的
      for(let id in obj){
        if(obj[id].completed){
          delete obj[id];
          length--;
          nextTodoId.num--;
        }
      }
      // 修改allIds中的数字，其实就是只保留前几项
      allIds = state.allIds.slice(0,length);
      // 修改byIds中剩余项的属性名
      for(let i = 1; i < state.allIds.length + 1; i++ ){
        if(obj[i]){
          obj[newId] = obj[i];
          if(i!==newId)delete obj[i];
          newId++
        }
      }
      return{
        ...state,
        allIds,
        byIds:obj,
      }
    }

    default:{
      return state;
    }
  }
}