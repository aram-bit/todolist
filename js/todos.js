const addBtn = document.querySelector(".add-todo-img");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");

import Storage from "./storage.js";
class Todos {
  constructor() {
    addBtn.addEventListener("click", (e) => this.addTodo(e));
    this.todos = [];
  }
  setUpApp(){
    this.todos=Storage.getTodos();
    this.createTodoList(this.todos);
  }
  addTodo(e) {
    e.preventDefault();
    if (!todoInput.value) return null;
    const newTodo = {
      title: todoInput.value,
      id: new Date().getTime(),
      createdAt: new Date().toISOString(),
      isCompleted: false,
    };
    Storage.saveTodo(newTodo);
    this.todos.push(newTodo);
    this.createTodoList(this.todos);
  }
  createTodoList(todos) {
    let result = "";
    todos.forEach((todo) => {
      result += ` <li class="todo">
            <p class="todo__title" data-todo-id=${todo.id}>${todo.title}</p>
            <span class="todo_control">
              <p class="todo__createdAt">${new Date(
                todo.createdAt
              ).toLocaleDateString("Fa-ir")}</p>
              <button class="todo__check" data-todo-id=${todo.id}>
                <img
                  src="/icons/circle-check.svg"
                  alt=""
                  class="todo-check-img"
                />
              </button>
              <button class="todo__remove" data-todo-id=${todo.id}>
                <img
                  src="/icons/trash-can.svg"
                  alt=""
                  class="todo-remove-img"
                />
              </button>
            </span>
          </li>
        `;
    });
    todoList.innerHTML = result;
    todoInput.value = "";
  }
}
export default new Todos();
