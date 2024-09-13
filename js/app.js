import todos from "./todos.js";
document.addEventListener("DOMContentLoaded",()=>{
  todos.setUpApp();
  todos.createTodoList(todos.todos);
})

