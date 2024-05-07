const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const showAllBtn = document.querySelector('.btn-show-all');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
let showAllTasks = true;


window.addEventListener('load', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
});

addBtn.addEventListener('click', addTask);
showAllBtn.addEventListener('click', toggleShowAll);

function addTask(e) {
    e.preventDefault();

    const text = input.value;

    if (text !== '') {
        addTaskToDOM(text, false); 
        saveTasksToLocalStorage(); 
        input.value = "";
        empty.style.display = 'none';
    }
}

function addTaskToDOM(text, completed) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = text;

    li.appendChild(p);
    ul.appendChild(li);

    if (completed) {
        li.classList.add('completed');
    }

    li.appendChild(addDoneBtn());
    li.appendChild(addDeleteBtn());
}

function addDoneBtn() {
    const doneBtn = document.createElement('button');

    doneBtn.textContent = "✔";
    doneBtn.className = "btn-done";

    doneBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        item.classList.add('completed');
        saveTasksToLocalStorage(); 
    });
    return doneBtn;
}

function addDeleteBtn() {
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);
        saveTasksToLocalStorage(); 
        const items = document.querySelectorAll('li');
        if (items.length === 0) {
            empty.style.display = 'block';
        }
    });
    return deleteBtn;
}

function toggleShowAll() {
    showAllTasks = !showAllTasks;
    const tasks = document.querySelectorAll('li');

    tasks.forEach(task => {
        const isDone = task.classList.contains('completed');

        if (showAllTasks && !isDone) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });

    if (showAllTasks) {
        showAllBtn.textContent = 'Show Completed Tasks Only';
    } else {
        showAllBtn.textContent = 'Show All Tasks';
    }
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const items = document.querySelectorAll('li');

    items.forEach(item => {
        tasks.push({
            text: item.querySelector('p').textContent,
            completed: item.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
