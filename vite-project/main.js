"use strict";

import "./style.css";

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

class Todo {
  id;
  name;
  date;
  isEditing;
  isChecked;
  constructor(name, date) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.date = date;
    this.isEditing = false;
    this.isChecked = false;
  }
}

class Project {
  id;
  title;
  todos;
  constructor(title) {
    this.id = self.crypto.randomUUID();
    this.title = title;
    this.todos = [];
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  renderTodos() {
    todoList.innerHTML = "";
    this.todos.forEach((todo) => {
      const html = `<li class="todo-list-item" id="${todo.id}">
      <div class="todo-item">
      <p class="todo-p1">Title:</p>
      <p class="todo-p2">${todo.name}
      </div>
      <div class="todo-item">
      <p class="todo-p1">Date:</p>
      <p class="todo-p2">${todo.date}</p>
      </div>
      <div class="todo-buttons">
      <button class="todo-edit-btn">edit</button>
      <button class="todo-delete-btn">delete</button>
      </div>
      <input type="checkbox" class="todo-checkbox">
      </li>`;
      todoList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

class ProjectManager {
  clickedProject;
  projects;
  constructor() {
    this.projects = [];
    this.clickedProject = null;
  }
  addProject(project) {
    this.projects.push(project);
  }
  deleteProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
  }
  renderProjects() {
    projectList.innerHTML = "";
    this.projects.forEach((project) => {
      const html = `<li class="project-list-item" id="${project.id}">
      <h1 class="project-list-title">${project.title}</h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="project-list-item-icon" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>
      </li>`;
      projectList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

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
  //deleteing
  if (event.target.classList.contains("todo-delete-btn")) {
    const li = event.target.closest("li");
    const id = li.id;
    projectManager.clickedProject.deleteTodo(id);
    li.remove();
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
