"use strict";

import "./style.css";

const newProjectBtn = document.querySelector(".projects-bar-add");
const projectCancelBtn = document.querySelector(".projects-form-cancel-btn");
const projectInput = document.querySelector(".projects-form-input");
const projectList = document.querySelector(".projects-bar-list");
const newTodoBtn = document.querySelector(".todos-bar-add");
const todoCancelBtn = document.querySelector(".todos-form-cancel-btn");
const projectForm = document.querySelector(".projects-form");
const todoForm = document.querySelector(".todos-bar-form");

let todoName;
let todoDate;
let projectName;

class Todo {
  id;
  name;
  date;
  isEditing;
  constructor(name, date) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.date = date;
    this.isEditing = false;
  }
}

class Project {
  title;
  todos;
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
}

class ProjectManager {
  projects;
  constructor() {
    this.projects = [];
  }
  addProject(project) {
    this.projects.push(project);
  }
  renderProjects() {
    projectList.innerHTML = "";
    this.projects.forEach((project) => {
      const html = `<li class="project-list-item">
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

newProjectBtn.addEventListener("click", function () {
  projectForm.classList.remove("hidden");
});
projectCancelBtn.addEventListener("click", function () {
  projectForm.classList.add("hidden");
});
projectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  projectManager.addProject(new Project(projectName));
  projectManager.renderProjects();
  projectInput.value = "";
  console.log(projectManager);
  projectForm.classList.add("hidden");
});
projectInput.addEventListener("change", function (event) {
  projectName = event.target.value;
});
newTodoBtn.addEventListener("click", function () {
  todoForm.classList.remove("hidden");
});
todoCancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  todoForm.classList.add("hidden");
});
todoForm.addEventListener("click", function (event) {
  event.preventDefault();
});
