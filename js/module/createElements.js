const createMaintitle = () => {
    const titleContainer = document.createElement('div');
    titleContainer.className = 'col';
    const title = document.createElement('h1');
    title.className = 'text-center';
    title.textContent = 'TODO — не теряй время зря!';
    titleContainer.append(title);
    return titleContainer;
};
export const createHeader = () => {
    const header = document.createElement('header');
    header.className =
        'row align-items-center justify-content-center flex-column';
    header.append(createMaintitle());
    return header;
};
export const createContainerForm = () => {
    const container = document.createElement('div');
    container.className = 'crud_todo me-3 mb-3';
    return container;
};

export const createForm = () => {
    const form = document.createElement('form');
    form.name = 'todo';
    form.className = 'd-flex align-items-center';
    form.action = '#';
    return form;
};

export const createInputTask = () => {
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
export const createSelectTask = () => {
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

export const createButtonsForm = () => {
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

export const createMain = () => {
    const main = document.createElement('main');
    main.className = 'container d-flex align-items-center main';
    return main;
};

export const createTable = () => {
    const table = document.createElement('table');
    table.className = 'table';
    return table;
};
export const createThead = () => {
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
export const createTr = (obj) => {
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
export const createTbody = () => document.createElement('tbody');
