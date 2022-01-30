import {renderTODO} from './module/render.js';

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

const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    const user = prompt('Ваше имя?');
    if (user) {
        renderTODO(app, user);
    }
};

window.TODOInit = init;
