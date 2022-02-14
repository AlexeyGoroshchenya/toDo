const todoControl = document.querySelector('.todo-control');
const headerButton = document.querySelector('.header-button');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach((item, index) => {

        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.complited) {
            todoCompleted.append(li);
        } else { todoList.append(li); }

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.complited = !item.complited;
            render();
        })


        //Удаление дел на кнопку КОРЗИНА
        li.querySelector('.todo-remove').addEventListener('click', () => {
            toDoData.splice(index, 1);
            render();
        })

    })

    //Сохранять данные о делах в localStorage
    localStorage['userData'] = JSON.stringify(toDoData);
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    //Пустые дела добавляться не должны
    if (headerInput.value !== '') {
        const newToDo = {
            text: headerInput.value,
            complited: false,
        }

        toDoData.push(newToDo);
        headerInput.value = '';

        render();
    }
})


//Дела из localStorage подгружаться должны автоматически при загрузки странице
const start = function () {
    let previousSessionData = localStorage.getItem('userData');

    if (previousSessionData !== null) {
        toDoData = JSON.parse(previousSessionData);
    }
    render();
}

start();


