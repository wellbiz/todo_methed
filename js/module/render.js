import {
    createHeader,
    createContainerForm,
    createForm,
    createInputTask,
    createSelectTask,
    createButtonsForm,
    createMain,
    createTable,
    createThead,
    createTr,
    createTbody,
} from './createElements.js';

import {addTodo, handlerButtonsTr} from './CRUDTasks.js';

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

export const renderTODO = (app, user) => {
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
