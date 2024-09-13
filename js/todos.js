const addBtn = document.querySelector(".add-todo-img");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

import Storage from "./storage.js";
class Todos {
  constructor() {
    addBtn.addEventListener("click", (e) => this.addTodo(e));
    selectFilter.addEventListener("change", (e) => this.filterTodos(e));
    this.todos = [];
  }
  setUpApp() {
    this.todos = Storage.getTodos();
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
            <p class="todo__title" data-id=${todo.id}>${todo.title}</p>
            <span class="todo_control">
              <p class="todo__createdAt">${new Date(
                todo.createdAt
              ).toLocaleDateString("Fa-ir")}</p>
              <button class="todo__check" data-id=${todo.id}>
                <img
                  src="/icons/circle-check.svg"
                  alt=""
                  class="todo-check-img"
                />
              </button>
              <button class="todo__remove" data-id=${todo.id}>
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
    const removeBtns = [...document.querySelectorAll(".todo__remove")];
    removeBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => this.removeTodo(e))
    );
  }
  filterTodos(e) {
    const filter = e.target.value;
    switch (filter) {
      case "all": {
        this.createTodoList(this.todos);
        break;
      }
      case "completed": {
        const filteredTodos = this.todos.filter((t) => t.isCompleted);
        this.createTodoList(filteredTodos);
        break;
      }

      case "uncompleted": {
        const filteredTodos = this.todos.filter((t) => !t.isCompleted);
        this.createTodoList(filteredTodos);

        break;
      }

      default: {
        this.createTodoList(this.todos);
        break;
      }
    }
  }
  removeTodo(e) {
    const todoId = e.target.dataset.id;
    const filteredTodos = this.todos.filter((t) => t.id !== parseInt(todoId));
    this.todos=filteredTodos;
    localStorage.setItem("todos",JSON.stringify(filteredTodos));
    this.createTodoList(filteredTodos);
  }
}
export default new Todos();
