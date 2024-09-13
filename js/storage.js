export default class Storage{
    static getTodos(){
        return JSON.parse(localStorage.getItem("todos")) || [];
    }
    static saveTodo(todoToSave){
       const savedTodos=this.getTodos();
       savedTodos.push(todoToSave);
       localStorage.setItem("todos",JSON.stringify(savedTodos));
    }
}