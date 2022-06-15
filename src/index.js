import "./styles.css";

import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';

export const todoList = new TodoList();

// Otra forma de llamar a la funcion con un solo argumento
todoList.todos.forEach(crearTodoHtml);
// todoList.todos.forEach((todo) => crearTodoHtml(todo));

console.log("todos", todoList.todos);

// const newTodo = new Todo("Aprender JavaScript");
// todoList.nuevoTodo(newTodo);
// todoList.todos[0].imprimirClase();
// newTodo.imprimirClase();

// const tarea = new Todo("Aprender Javascript");
// todoList.nuevoTodo(tarea);

// console.log(todoList);
// crearTodoHtml(tarea);

// LocalStorage or SessionStorage
// localStorage.setItem("mi-key", "abc123");
// sessionStorage.setItem("mi-key", "abc123");
// setTimeout( ()=> {
//   localStorage.removeItem("mi-key");
// }, 1500)
