export class Todo {
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
  changeIsEdit() {
    this.isEditing = !this.isEditing;
  }
}

export class Project {
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
    let html;
    this.todos.forEach((todo) => {
      if (todo.isEditing) {
        html = `<li class="todo-list-item" id="${todo.id}">
        <div class="todo-item">
        <p class="todo-p1">Title:</p>
        <input type="text" class="todo-edit-title" value="${todo.name}" >
        </div>
        <div class="todo-item">
        <p class="todo-p1">Date:</p>
        <input type="date" class="todo-edit-date" value="${todo.date}" >
        </div>
        <div class="todo-buttons">
        <button class="todo-edit-btn">edit</button>
        <button class="todo-delete-btn">delete</button>
        </div>
        <input type="checkbox" class="todo-checkbox">
        </li>`;
      } else {
        html = `<li class="todo-list-item" id="${todo.id}">
        <div class="todo-item">
        <p class="todo-p1">Title:</p>
        <p class="todo-p2">${todo.name}</p>
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
      }
      todoList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

export class ProjectManager {
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
