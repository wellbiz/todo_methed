{
    const addCounter2css = () => {
        const head = document.querySelector('head');
        const style = document.createElement('style');
        style.textContent =
            'body{counter-reset:row_id}.row_id::before{counter-increment:row_id;content:counter(row_id)}' +
            '.row_id{text-align:center}tr{vertical-align:initial}' +
            '.th_number{width:60px}.th_status{width:160px}.th_operations{width:195px;}.main{padding:0}';

        head.append(style);
    };
    addCounter2css();

    const createHeader = () => {
        const header = document.createElement('header');
        header.className =
            'row align-items-center justify-content-center flex-column';
        header.append(createMaintitle());
        return header;
    };

    const createMaintitle = () => {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'col';
        const title = document.createElement('h1');
        title.className = 'text-center';
        title.textContent = 'TODO — не теряй время зря!';
        titleContainer.append(title);
        return titleContainer;
    };

    const createContainerForm = () => {
        const container = document.createElement('div');
        container.className = 'crud_todo me-3 mb-3';
        return container;
    };

    const createForm = () => {
        const form = document.createElement('form');
        form.name = 'todo';
        form.className = 'd-flex align-items-center';
        form.action = '#';
        return form;
    };

    const createInputTask = () => {
        const label = document.createElement('label');
        label.className = 'form-group me-3 mb-0 col-6';
        const input = document.createElement('input');
        input.name = 'task';
        input.maxLength = 80;
        input.classList.add('form-control');
        input.placeholder = 'Введи задачу';
        input.required = true;
        label.append(input);
        return label;
    };
    const createSelectTask = () => {
        const select = document.createElement('select');
        select.name = 'priority';
        select.className = 'form-select me-3 mb-0';

        const optionsValues = ['default', 'important', 'urgently'];
        const optionsText = ['Обычная', 'Важная', 'Срочная'];

        const option = document.createElement('option');
        const firstOption = option.cloneNode();

        firstOption.selected = true;
        firstOption.textContent = 'Выбери срочность';

        select.append(firstOption);
        for (let i = 0; i < optionsValues.length; ++i) {
            const currentOption = option.cloneNode();
            currentOption.value = optionsValues[i];
            currentOption.textContent = optionsText[i];
            select.append(currentOption);
        }

        return select;
    };

    const createButtonsForm = () => {
        const button = document.createElement('button');
        const buttonSave = button.cloneNode();
        const buttonClean = button.cloneNode();
        buttonSave.disabled = true;
        buttonSave.type = 'submit';
        buttonSave.className = 'btn btn-primary me-3';
        buttonSave.name = 'save';
        buttonSave.textContent = 'Сохранить';

        buttonClean.type = 'reset';
        buttonClean.className = 'btn btn-warning';
        buttonClean.name = 'clean';
        buttonClean.textContent = 'Очистить';

        return {buttonSave, buttonClean};
    };

    const createMain = () => {
        const main = document.createElement('main');
        main.className = 'container d-flex align-items-center main';
        return main;
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.className = 'table';
        return table;
    };
    const createThead = () => {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');

        const thNumber = th.cloneNode();
        const thTask = th.cloneNode();
        const thPriority = th.cloneNode();
        const thOperation = th.cloneNode();
        thNumber.className = 'th_number text-center';
        thNumber.textContent = '№';

        thTask.textContent = 'Задача';

        thPriority.className = 'th_status';
        thPriority.textContent = 'Статус';

        thOperation.className = 'th_operations';
        thOperation.textContent = 'Операции';
        tr.append(thNumber, thTask, thPriority, thOperation);
        thead.append(tr);
        return thead;
    };
    const createTr = (obj) => {
        const tr = document.createElement('tr');
        tr.dataset.id = obj.id;
        if (obj.status != 'Выполнена') {
            switch (obj.priority) {
                case 'default':
                    tr.classList.add('text-dark', 'table-primary');
                    break;
                case 'important':
                    tr.classList.add('text-secondary', 'table-warning');
                    break;
                case 'urgently':
                    tr.classList.add('text-danger', 'table-danger');
                    break;
            }
        } else {
            tr.classList.add('text-success', 'table-success');
        }

        const th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.className = 'row_id';

        const td = document.createElement('td');
        const tdTask = td.cloneNode();
        const tdStatus = td.cloneNode();

        tdTask.textContent = obj.task;
        if (obj.status) tdStatus.textContent = obj.status;
        else tdStatus.textContent = 'в процессе';
        const tdButtons = td.cloneNode();

        const button = document.createElement('button');
        button.className = 'btn btn-light';
        const buttonDel = button.cloneNode();
        const buttonDone = button.cloneNode();
        buttonDone.classList.add('js-done');
        buttonDel.classList.add('me-1');
        buttonDel.classList.add('js-del');

        const img = document.createElement('img');
        const imgDel = img.cloneNode();
        const imgDone = img.cloneNode();
        imgDel.src = './img/trash.svg';
        imgDel.alt = 'Удалить задачу';
        imgDone.src = './img/check2-square.svg';
        imgDone.alt = 'Завершить задачу';
        buttonDone.textContent = ' Завершить';
        buttonDel.append(imgDel);
        buttonDone.prepend(imgDone);
        if (obj.status != 'Выполнена') tdButtons.append(buttonDel, buttonDone);
        else tdButtons.append(buttonDel);
        tr.append(th, tdTask, tdStatus, tdButtons);
        return tr;
    };
    const createTbody = () => document.createElement('tbody');
    const addTodo = () => {
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

    const handlerButtonsTr = () => {
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
            console.log(todoes);
            localStorage.setItem(
                `tasks_${currentUser}`,
                JSON.stringify(todoes)
            );
        } else {
            currentTodo.id = data.at(-1).id + 1;
            data.push(currentTodo);
            console.log(data);
            localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(data));
        }
    };
    const renderDataFromLocalStorage = (user) => {
        localStorage.setItem('currentUser', user);
        const data = JSON.parse(localStorage.getItem(`tasks_${user}`));
        const tbody = document.querySelector('.table tbody');
        if (data) {
            data.forEach((currentTask) => {
                console.log(currentTask);
                tbody.append(createTr(currentTask));
            });
        }
    };

    const renderTODO = (app, user) => {
        const container = app;
        container.classList.add('container');
        const body = document.querySelector('body');
        const header = createHeader();

        const containerForm = createContainerForm();
        const form = createForm();
        const inputTask = createInputTask();
        const selectedTask = createSelectTask();
        const buttonsForm = createButtonsForm();

        const main = createMain();
        const table = createTable();
        const thead = createThead();
        const tbody = createTbody();
        form.append(
            inputTask,
            selectedTask,
            buttonsForm.buttonSave,
            buttonsForm.buttonClean
        );
        containerForm.append(form);
        header.append(containerForm);

        main.append(table);

        table.append(thead, tbody);
        container.append(header, main);
        body.append(container);
        renderDataFromLocalStorage(user);
        addTodo();
        handlerButtonsTr();
    };
    const init = (selectorApp) => {
        const app = document.querySelector(selectorApp);
        const user = prompt('Ваше имя?');
        if (user) {
            renderTODO(app, user);
        }
    };


    window.TODOInit = init;
}

/*
Разбить на модули
сдать на проверку и переделать на модальное окно
попробовать сделать редактируемым задачу и добавить кнопку редактирования (а еще лучше по дабблклику + конфирм)
*/