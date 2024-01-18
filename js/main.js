'use strict';

const inputAdd = document.querySelector('.js-inputAdd');
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const btnAdd = document.querySelector('.js-btnAdd');
const list = document.querySelector('.js-list');
const msg = document.querySelector('.js-msg');

let tasks = [];

function renderMessage() {
  let taskComplete = [];
  let taskIncomplete = [];
  for (const task of tasks) {
    if (task.completed) {
      taskComplete.push(task);
    } else {
      taskIncomplete.push(task);
    }
    msg.innerHTML = `Tienes ${tasks.length} tareas. ${taskComplete.length} completadas y ${taskIncomplete.length} por realizar.`;
  }
}

function renderTask(array) {
  list.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    list.appendChild(li);
    const inputCheck = document.createElement('input');
    const label = document.createElement('label');
    li.appendChild(label);
    const textInput= document.createTextNode(array[i].name);
    label.appendChild(textInput);
    inputCheck.setAttribute('type', 'checkbox');
    label.appendChild(inputCheck);

    if (array[i].completed) {
      inputCheck.setAttribute('checked', '');
      label.setAttribute('class','tachado');
    }
  }
}

const tasksLS = JSON.parse(localStorage.getItem('tasks'));

function chargeData() {
  fetch('https://dev.adalab.es/api/todo')
    .then((response) => response.json())
    .then((data) => {
      tasks = data.results;
      if (tasksLS !== null) {
        renderTask(tasks);
        renderMessage();
      } else {
        fetch('https://dev.adalab.es/api/todo')
          .then((response) => response.json())
          .then((data) => {
            tasks = data.results;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTask(tasks);
            renderMessage();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
}

chargeData();

function handleSearch(event) {
  event.preventDefault();
  const search = inputSearch.value;
  const searchTask = tasks.filter((task) => {
    if (task.name.includes(search)) {
      return task.name;
    }
  });
  list.innerHTML = '';
  renderTask(searchTask);
}

btnSearch.addEventListener('click', handleSearch);

function check(event) {
  const taskCheck = event.target;
  const taskCheckParent = taskCheck.parentNode;
  // Encuentra la tarea correspondiente en el array tasks
  const task = tasks.find((item) => item.name === taskCheckParent.textContent); //busca el primer elemento de tasks, cuya propiedad name coincida con el contenido de texto del elemento padre del checkbox
  // Verifica si el checkbox está marcado y actualiza la tarea correspondiente
  if (taskCheck.checked) {
    taskCheckParent.classList.add('tachado');
    task.completed = true;
  } else {
    taskCheckParent.classList.remove('tachado');
    task.completed = false;
  }
  renderMessage();
}
list.addEventListener('click', check);

const addTask = (event) => {
  event.preventDefault();
  const newTask = { name: '', completed: false };
  let addTask = inputAdd.value;
  newTask.name = addTask;
  tasks.push(newTask);
  console.log(tasks);
  renderTask(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

btnAdd.addEventListener('click', addTask);
