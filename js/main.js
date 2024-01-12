'use strict';

const inputAdd = document.querySelector('.js-inputAdd');
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const btnAdd = document.querySelector('.js-btnAdd');
const list = document.querySelector('.js-list');

const tasks = [
  { name: 'Recoger setas en el campo', completed: true },
  { name: 'Comprar pilas', completed: true },
  { name: 'Poner una lavadora de blancos', completed: true },
  {
    name: 'Aprender cómo se realizan las peticiones al servidor en JavaScript',
    completed: false,
  },
];

// const taskCompleted = tasks.filter((task) => task.completed);
// console.log(taskCompleted);

function check(event) {
  const taskCheck = event.target;
  const taskCheckParent = taskCheck.parentNode;
  for (const taskTrue of tasks) {
    if (taskCheck.checked === true) {
      taskCheckParent.classList.add('checked');
      taskTrue.completed = true;
    } else {
      taskCheckParent.classList.remove('checked');
      taskTrue.completed = false;
    }
  }
  console.log(tasks);
}

list.addEventListener('click', check);

function renderTask(array) {
  for (let i = 0; i < array.length; i++) {
    list.innerHTML += `<li><input type="checkbox">${array[i].name}</li>`;
  }
}

renderTask(tasks);
