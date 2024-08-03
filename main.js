"use strict";

import "./style.css";
import { Todo, Project, ProjectManager } from "./classes";
const newProjectBtn = document.querySelector(".projects-bar-add");
const projectCancelBtn = document.querySelector(".projects-form-cancel-btn");
const projectInput = document.querySelector(".projects-form-input");
const projectList = document.querySelector(".projects-bar-list");
const projectForm = document.querySelector(".projects-form");
const newTodoBtn = document.querySelector(".todos-bar-add");
const todoCancelBtn = document.querySelector(".todos-form-cancel-btn");
const todoForm = document.querySelector(".todos-bar-form");
const todoList = document.querySelector(".todos-bar-list");
const todoTitleInput = document.querySelector(".todos-bar-form-title-input");
const todoDateInput = document.querySelector(".todos-bar-form-date-input");
let todoName;
let todoDate;
let projectName;

const projectManager = new ProjectManager();

// +New buttons:
newProjectBtn.addEventListener("click", function () {
  projectForm.classList.remove("hidden");
});

newTodoBtn.addEventListener("click", function () {
  if (projectManager.projects.length === 0) {
    alert("You must create a project first");
    return;
  }
  if (projectManager.clickedProject !== null) {
    todoForm.classList.remove("hidden");
  } else {
    alert("You must choose a project first");
  }
});

//Cancel buttons:
projectCancelBtn.addEventListener("click", function () {
  projectForm.classList.add("hidden");
});

todoCancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  todoForm.classList.add("hidden");
});

//Forms:
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  projectManager.clickedProject.addTodo(new Todo(todoName, todoDate));
  projectManager.clickedProject.renderTodos();
  todoTitleInput.value = "";
  todoDateInput.value = "";
  todoForm.classList.add("hidden");
  console.log(projectManager);
});

projectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  projectManager.addProject(new Project(projectName));
  projectManager.renderProjects();
  projectInput.value = "";
  console.log(projectManager);
  projectForm.classList.add("hidden");
});

//Lists:
projectList.addEventListener("click", function (event) {
  if (event.target.classList.contains("project-list-item")) {
    const li = event.target.closest("li");
    const id = li.id;
    projectManager.clickedProject = projectManager.projects.find(
      (project) => project.id === id
    );
    projectManager.clickedProject.renderTodos();
    console.log(projectManager);
  }

  //deleting
  if (event.target.classList.contains("project-list-item-icon")) {
    const li = event.target.closest("li");
    const id = li.id;
    projectManager.deleteProject(id);
    li.remove();
  }
});

todoList.addEventListener("click", function (event) {
  //deleting
  if (event.target.classList.contains("todo-delete-btn")) {
    const li = event.target.closest("li");
    const id = li.id;
    projectManager.clickedProject.deleteTodo(id);
    li.remove();
  }

  //editing
  if (event.target.classList.contains("todo-edit-btn")) {
    const li = event.target.closest("li");
    const id = li.id;
    const currentTodo = projectManager.clickedProject.todos.find(
      (todo) => todo.id === id
    );
    const restOfTodos = projectManager.clickedProject.todos.filter(
      (todo) => todo.id !== id
    );
    restOfTodos.forEach((todo) => (todo.isEditing = false));
    currentTodo.changeIsEdit();
    projectManager.clickedProject.renderTodos();

    if (currentTodo.isEditing) {
      const editTodoTitle = document.querySelector(".todo-edit-title");
      editTodoTitle.addEventListener("change", function (event) {
        currentTodo.name = event.target.value;
      });
      const editTodoDate = document.querySelector(".todo-edit-date");
      editTodoDate.addEventListener("click", function (event) {
        currentTodo.date = event.target.value;
      });
    }
  }

  //checkbox
  if (event.target.classList.contains(".todo-checkbox")) {
    const todoCheckbox = document.querySelector(".todo-checkbox");
    const li = event.target.closest("li");
    const id = li.id;
    const currentTodo = projectManager.clickedProject.todos.find(
      (todo) => todo.id === id
    );
    todoCheckbox.addEventListener("change", function (event) {
      currentTodo.isChecked = event.target.checked;
    });
  }
});

//Inputs:
projectInput.addEventListener("change", function (event) {
  projectName = event.target.value;
});
todoTitleInput.addEventListener("change", function (event) {
  todoName = event.target.value;
});
todoDateInput.addEventListener("change", function (event) {
  todoDate = event.target.value;
});
