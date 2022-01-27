{
  const addCounter2css = () => {
    const head = document.querySelector("head");
    const style = document.createElement("style");
    style.textContent =
      "body{counter-reset:row_id}.row_id::before{counter-increment:row_id;content:counter(row_id)}" +
      ".row_id{text-align:center}tr{vertical-align:initial}" +
      ".th_number{width:60px}.th_status{width:160px}.th_operations{width:195px;}.main{padding:0}";

    head.append(style);
  };
  addCounter2css();

  const createHeader = () => {
    const header = document.createElement("header");
    header.className =
      "row align-items-center justify-content-center flex-column";
    header.append(createMaintitle());
    return header;
  };

  const createMaintitle = () => {
    const titleContainer = document.createElement("div");
    titleContainer.className = "col";
    const title = document.createElement("h1");
    title.className = "text-center";
    title.textContent = "TODO — не теряй время зря!";
    titleContainer.append(title);
    return titleContainer;
  };

  const createContainerForm = () => {
    const container = document.createElement("div");
    container.className = "crud_todo me-3 mb-3";
    return container;
  };

  const createForm = () => {
    const form = document.createElement("form");
    form.name = "todo";
    form.className = "d-flex align-items-center";
    form.action = "#";
    return form;
  };

  const createInputTask = () => {
    const label = document.createElement("label");
    label.className = "form-group me-3 mb-0 col-6";
    const input = document.createElement("input");

    input.name = "task";
    input.classList.add("form-control");
    input.placeholder = "Введи задачу";
    label.append(input);
    return label;
  };
  const createSelectTask = () => {
    const select = document.createElement("select");
    select.name = "priority";
    select.className = "form-select me-3 mb-0";

    const optionsValues = ["default", "important", "urgently"];
    const optionsText = ["Обычная", "Важная", "Срочная"];

    const option = document.createElement("option");
    const firstOption = option.cloneNode();

    firstOption.selected = true;
    firstOption.textContent = "Выбери срочность";

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
    const button = document.createElement("button");
    const buttonSave = button.cloneNode();
    const buttonClean = button.cloneNode();

    buttonSave.type = "submit";
    buttonSave.className = "btn btn-primary me-3";
    buttonSave.name = "save";
    buttonSave.textContent = "Сохранить";

    buttonClean.type = "reset";
    buttonClean.className = "btn btn-warning";
    buttonClean.name = "clean";
    buttonClean.textContent = "Очистить";

    return { buttonSave, buttonClean };
  };

  const createMain = () => {
    const main = document.createElement("main");
    main.className = "container d-flex align-items-center main";
    return main;
  };

  const createTable = () => {
    const table = document.createElement("table");
    table.className = "table";
    return table;
  };
  const createThead = () => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "col");

    const thNumber = th.cloneNode();
    const thTask = th.cloneNode();
    const thPriority = th.cloneNode();
    const thOperation = th.cloneNode();
    thNumber.className = "th_number text-center";
    thNumber.textContent = "№";

    thTask.textContent = "Задача";

    thPriority.className = "th_status";
    thPriority.textContent = "Статус";

    thOperation.className = "th_operations";
    thOperation.textContent = "Операции";
    tr.append(thNumber, thTask, thPriority, thOperation);
    thead.append(tr);
    return thead;
  };
  const renderTODO = (app) => {
    const container = app;
    container.classList.add("container");
    const body = document.querySelector("body");
    const header = createHeader();

    const containerForm = createContainerForm();
    const form = createForm();
    const inputTask = createInputTask();
    const selectedTask = createSelectTask();
    const buttonsForm = createButtonsForm();

    const main = createMain();
    const table = createTable();
    const thead = createThead();
    form.append(
      inputTask,
      selectedTask,
      buttonsForm.buttonSave,
      buttonsForm.buttonClean
    );
    containerForm.append(form);
    header.append(containerForm);

    main.append(table);
    table.append(thead);
    container.append(header, main);
    body.append(container);
  };
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    renderTODO(app);
  };
  //const allRow = renderTODOFromLocalStorage(list);
  //   deleteControl(btnDel, list);
  //   addControl(btnAdd, list);
  //   doneControl(btnDone, list);

  window.TODOInit = init;
}
