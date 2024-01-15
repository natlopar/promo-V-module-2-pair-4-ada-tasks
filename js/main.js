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
//let tasks = [];
function renderTask(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].completed) {
      list.innerHTML += `<li class="tachado"><input type="checkbox" checked>${array[i].name}</li>`;
    } else {
      list.innerHTML += `<li><input type="checkbox">${array[i].name}</li>`;
    }
  }
}
renderTask(tasks);
// function chargeData() {
//   fetch('https://dev.adalab.es/api/todo')
//     .then((response) => response.json())
//     .then((data) => {
//       for (const result of data.results) {
//         tasks = result;
//       }
//     });
//   renderTask(tasks);
// }

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

  console.log(tasks);
}
list.addEventListener('click', check);
