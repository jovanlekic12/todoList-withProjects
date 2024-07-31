"use strict";

import "./style.css";

const projectAddBtn = document.querySelector(".projects-bar-add");
const projectCancelBtn = document.querySelector(".projects-form-cancel-btn");
const todoAddBtn = document.querySelector(".todos-bar-add");
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
