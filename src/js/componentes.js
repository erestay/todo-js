import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");
// const countPendientes = document.querySelector(".todo-count");

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? "checked" : ""
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

// Eventos
txtInput.addEventListener("keyup", (event) => {
  // keyCode (13) // Tecla Enter
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  // input, label, button
  const nombreElemento = event.target.localName;
  // console.log(nombreElemento);
  const todoElemento = event.target.parentElement.parentElement;
  // console.log(todoElemento);
  const todoId = todoElemento.getAttribute("data-id");
  // console.log(todoId);

  // Completado: click en el check
  if (nombreElemento.includes("input")) {
    // Marcamos completado el todo del arreglo
    todoList.marcarCompletado(todoId);
    // Agregamos la clase completed al html
    todoElemento.classList.toggle("completed");

    // Eliminar todo: click en el button
  } else if (nombreElemento.includes("button")) {
    // Eliminacion del todo del arreglo
    todoList.eliminarTodo(todoId);
    // Eliminacion el todo del html
    divTodoList.removeChild(todoElemento);

    // todoElemento.classList.toggle("destroy");
  }
  // console.log(todoList);
});

btnBorrar.addEventListener("click", () => {
  // Eliminar todos completados del arreglo
  todoList.eliminarCompletados();
  // Eliminar todos del html - de abajo hacia arriba
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];

    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener("click", (event) => {
  // Todos, Pendientes, Completados
  console.log(event.target.text);

  const filtro = event.target.text;
  if (!filtro) return;

  // Remueve clase selected
  anchorFiltros.forEach(elem => elem.classList.remove("selected"));
  // console.log(event.target);
  event.target.classList.add("selected");

  for (const elemento of divTodoList.children) {
    // console.log(elemento);
    elemento.classList.remove("hidden");
    const completado = elemento.classList.contains("completed");

    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;

      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});
