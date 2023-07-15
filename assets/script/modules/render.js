import {
    createTitle,
    createForm,
    createTable,
    createRow,
    createModal,
} from './createElements.js';

export const addTaskPage = (task, list) => {
    list.append(createRow(task));
};

export const renderToDoApp = key => {
    const container = document.querySelector('.app-container');
    container.classList.add(
            'vh-100', 'w-100', 'd-flex', 'align-items-center',
            'flex-column', 'pt-3',
    );

    const title = createTitle(key);
    const form = createForm();
    const {tableWrapper, table} = createTable();

    container.append(title, form, tableWrapper);

    return {
        form,
        list: table.tBody,
    };
};

export const renderTasks = (data, list) => {
    const allRow = data.map(createRow);
    console.log('allRow: ', allRow);
    list.append(...allRow);

    return allRow;
};

export const renderModal = () => {
    const container = document.querySelector('.app-container');
    const {modalOverlay, modalForm} = createModal();
    container.append(modalOverlay);

    return {
        modalOverlay,
        modalForm,
    };
};
