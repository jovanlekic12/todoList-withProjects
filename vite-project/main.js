"use strict";

import "./style.css";

const newProjectBtn = document.querySelector(".projects-bar-add");
const projectCancelBtn = document.querySelector(".projects-form-cancel-btn");
const newTodoBtn = document.querySelector(".todos-bar-add");
const todoCancelBtn = document.querySelector(".todos-form-cancel-btn");
const projectForm = document.querySelector(".projects-form");
const todoForm = document.querySelector(".todos-bar-form");

class Todo {
  id;
  name;
  date;
  constructor(name, date) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.date = date;
  }
}

newProjectBtn.addEventListener("click", function () {
  projectForm.classList.remove("hidden");
});
projectCancelBtn.addEventListener("click", function () {
  projectForm.classList.add("hidden");
});
projectForm.addEventListener("click", function (event) {
  event.preventDefault();
});

newTodoBtn.addEventListener("click", function () {
  todoForm.classList.remove("hidden");
});
todoCancelBtn.addEventListener("click", function () {
  todoForm.classList.add("hidden");
});
todoForm.addEventListener("click", function (event) {
  event.preventDefault();
});
