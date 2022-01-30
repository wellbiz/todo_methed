import {createTr} from './createElements.js';

export const addTodo = () => {
    const form = document.forms.todo;
    const input = document.forms.todo.task;
    const select = document.forms.todo.priority;
    const btnSave = document.forms.todo.save;
    const btnClean = document.forms.todo.clean;
    input.addEventListener('input', () => {
        if (input.value === '' && select.value === 'Выбери срочность')
            btnSave.disabled = true;
        else btnSave.disabled = false;
    });
    select.addEventListener('input', () => {
        if (select.value === 'Выбери срочность') btnSave.disabled = true;
        else btnSave.disabled = false;
    });
    btnSave.addEventListener('click', () => {
        if (select.value === 'Выбери срочность') {
            btnSave.disabled = true;
            alert('Вы не выбрали срочность задачи. Выберите');
        } else btnSave.disabled = false;
    });
    btnClean.addEventListener('click', () => {
        btnSave.disabled = true;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = {
            task: input.value,
            priority: select.value,
            cleanAll() {
                input.value = '';
                select.value = 'Выбери срочность';
            },
        };
        addToLocalStorage(todo);
        const tr = createTr(todo);
        todo.cleanAll();
        document.querySelector('.table tbody').append(tr);
    });
};

export const handlerButtonsTr = () => {
    const tbody = document.querySelector('.table tbody');
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const currentTr = target.closest('tr');
        const currentId = currentTr.dataset.id;
        let data = JSON.parse(
            localStorage.getItem(
                `tasks_${localStorage.getItem('currentUser')}`
            )
        );
        if (target.closest('.js-del')) {
            const isDel = confirm('Вы точно хотите удалить эту задачу?');
            if (isDel) {
                let newArrTasks = [];
                data.forEach((item) => {
                    if (item.id != currentId) newArrTasks.push(item);
                });
                localStorage.setItem(
                    `tasks_${localStorage.getItem('currentUser')}`,
                    JSON.stringify(newArrTasks)
                );
                currentTr.remove();
            }
        }
        if (target.closest('.js-done')) {
            const status = currentTr.querySelector('td:nth-child(3)');
            status.textContent = 'Выполнена';
            currentTr.className = 'text-success table-success';
            target.closest('.js-done').remove();

            data.forEach((item) => {
                if (item.id == currentId) item.status = 'Выполнена';
            });
            localStorage.setItem(
                `tasks_${localStorage.getItem('currentUser')}`,
                JSON.stringify(data)
            );
        }
    });
};
const addToLocalStorage = (todo) => {
    const currentUser = localStorage.getItem('currentUser');
    const currentTodo = {
        task: todo.task,
        priority: todo.priority,
        status: 'В процессе',
    };
    let todoes = [];
    const data = JSON.parse(localStorage.getItem(`tasks_${currentUser}`));
    if (!data || data.length === 0) {
        currentTodo.id = 0;
        todoes.push(currentTodo);
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(todoes));
    } else {
        currentTodo.id = data.at(-1).id + 1;
        data.push(currentTodo);
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(data));
    }
};

export const editTask = () => {
    const tbody = document.querySelector('.table tbody');
    tbody.addEventListener('dblclick', (e) => {
        const target = e.target;
        if (!target.closest('.task')) return;
        const currentTask = target.closest('.task');
        currentTask.setAttribute('contenteditable', 'true');
        currentTask.addEventListener('blur', () => {
            currentTask.setAttribute('contenteditable', 'false');
            const editedText = currentTask.textContent;
            const id = currentTask.parentNode.dataset.id;

            let tasks = JSON.parse(
                localStorage.getItem(
                    `tasks_${localStorage.getItem('currentUser')}`
                )
            );
            let editedTasks = [];
            tasks.forEach((currentTask) => {
                if (id == currentTask.id) currentTask.task = editedText;

                editedTasks.push(currentTask);
            });

            localStorage.setItem(
                `tasks_${localStorage.getItem('currentUser')}`,
                JSON.stringify(editedTasks)
            );
        });
    });
};
