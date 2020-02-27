//  给一个用于筛选的字符串，一个state对象，返回一个对象数组，这个数组可以直接被遍历使用，其中每个对象都有三个属性，id,content,completed

const getTodoByVisibilityFilters = (store,visibilityFilter)=>{
  console.log(store);
  const allTodos = store.todos.allIds.map((item)=>(
    {
      id:item,
      content:store.todos.byIds[item].content,
      completed:store.todos.byIds[item].completed
    }
  ))

  switch (visibilityFilter){
    case 'completed':
      return allTodos.filter(item=>item.completed);
    case 'active':
      return allTodos.filter(item=>!item.completed);
    case 'all':
    default:
      return allTodos;
  }
}

export default getTodoByVisibilityFilters;