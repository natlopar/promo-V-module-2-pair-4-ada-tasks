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

function check (event) {
    const taskCheck = event.target.value;
    console.log(taskCheck);
    if( taskCheck === true) {
        console.log('true')
        list.classList.add('checked');
    }
}

list.addEventListener('click', check);

function renderTask (array) {
    for( let i=0; i<array.length; i++) {
       list.innerHTML += `<label><input type="checkbox" >${array[i].name}</label>`;
    }
   
}

renderTask(tasks);


