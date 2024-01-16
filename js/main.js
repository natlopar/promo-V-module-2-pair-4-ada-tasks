'use strict';

const inputAdd = document.querySelector('.js-inputAdd');
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const btnAdd = document.querySelector('.js-btnAdd');
const list = document.querySelector('.js-list');
const msg = document.querySelector('.js-msg');
const GITHUB_USER = 'mbueno992';
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;



// const tasks = [
//   { name: 'Recoger setas en el campo', completed: true },
//   { name: 'Comprar pilas', completed: true },
//   { name: 'Poner una lavadora de blancos', completed: true },
//   {
//     name: 'Aprender cómo se realizan las peticiones al servidor en JavaScript',
//     completed: false,
//   },
// ];
let tasks = [];

function renderMessage () {
  let taskComplete = [];
  let taskIncomplete = [];
  for(const task of tasks) {
    if (task.completed) {
      taskComplete.push(task);
      console.log(taskComplete);
    } else {
      taskIncomplete.push(task);
      console.log(taskIncomplete);
    }
  msg.innerHTML = `Tienes ${tasks.length} tareas. ${taskComplete.length} completadas y ${taskIncomplete.length} por realizar.`;
  }
}


function renderTask(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].completed) {
      list.innerHTML += `<li class="tachado"><input type="checkbox" checked>${array[i].name}</li>`;
    } else {
      list.innerHTML += `<li><input type="checkbox">${array[i].name}</li>`;
    }
  }
}


function chargeData() {
  fetch('https://dev.adalab.es/api/todo')//fetch(SERVER_URL).then();
    .then((response) => response.json())
    .then((data) => {
      tasks = data.results;
      renderTask(tasks);
      renderMessage();
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
  fetch(`https://dev.adalab.es/api/todo/`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify('nueva tarea'),//crear un objeto y enviar en este formato
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.success) {
      //Completa y/o modifica el código:
      //Agrega la nueva tarea al listado
      //Guarda el listado actualizado en el local storage
      //Visualiza nuevamente el listado de tareas
      //Limpia los valores de cada input
    } else {
      //muestra un mensaje de error.
    }
  });
  

}



  btnAdd.addEventListener('click',addTask);