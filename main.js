const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const showAllBtn = document.querySelector('.btn-show-all');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
let showAllTasks = true;

addBtn.addEventListener('click', addTask);
showAllBtn.addEventListener('click', toggleShowAll);

function addTask(e) {
    e.preventDefault();

    const text = input.value;

    if (text !== '') {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = text;

        li.appendChild(p);
        ul.appendChild(li);

        li.appendChild(addDoneBtn());
        li.appendChild(addDeleteBtn());

        input.value = "";
        empty.style.display = 'none';
    }
}

function addDoneBtn() {
    const doneBtn = document.createElement('button');

    doneBtn.textContent = "✔";
    doneBtn.className = "btn-done";

    doneBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        item.classList.add('completed');

        const items = document.querySelectorAll('li');

        if (items.length === 0) {
            empty.style.display = 'block';
        }
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
