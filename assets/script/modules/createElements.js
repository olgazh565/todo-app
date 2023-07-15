export const createTitle = key => {
    const title = document.createElement('h3');
    title.classList.add('mb-3');
    title.textContent = `${key}, приветствую в Todo App!`;

    return title;
};

export const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');

    form.insertAdjacentHTML('beforeend', `
        <label class="form-group me-3 mb-0">
            <input type="text" class="form-control form-input" name="task" 
                placeholder="ввести задачу">
        </label>
        <select class="form-select me-3 mb-0 w-25" name="priority"
            aria-label="выбери важность">
            <option value="table-light">Важность</option>
            <option value="table-light">Обычная</option>
            <option value="table-warning">Важная</option>
            <option value="table-danger">Срочная</option>
        </select>
        <button type="submit" class="btn btn-primary me-3">
            Сохранить
        </button>
        <button type="reset" class="btn btn-warning">
            Очистить
        </button>
    `);

    return form;
};

export const createTable = () => {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');

    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');

    const tHead = document.createElement('thead');
    tHead.insertAdjacentHTML('beforeend', `
        <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
        </tr>
    `);

    const tBody = document.createElement('tbody');
    tBody.tabIndex = 0;

    table.append(tHead, tBody);
    tableWrapper.append(table);

    table.tBody = tBody;

    return {
        tableWrapper,
        table,
    };
};

export const createRow = ({id, task, priority, status}) => {
    const tr = document.createElement('tr');
    tr.classList.add(priority);
    tr.id = id;
    tr.tabIndex = 0;

    const tdNumber = document.createElement('td');

    const tdTask = document.createElement('td');
    tdTask.textContent = task;

    const tdStatus = document.createElement('td');
    tdStatus.textContent = status;

    const tdButtons = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Удалить';

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('btn', 'btn-success');
    completeBtn.innerText = 'Завершить';

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-secondary');
    editBtn.innerText = 'Редактировать';

    if (priority === 'table-success') {
        completeBtn.disabled = true;
        editBtn.disabled = true;
        tdTask.classList.add('text-decoration-line-through');
    } else {
        completeBtn.disabled = false;
        editBtn.disabled = false;
        tdTask.classList.add('task');
    }

    tdButtons.append(deleteBtn, completeBtn, editBtn);
    tr.append(tdNumber, tdTask, tdStatus, tdButtons);

    return tr;
};

export const createModal = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('form-overlay');

    const modalForm = document.createElement('form');
    modalForm.classList.add('form', 'modal-form');

    modalForm.insertAdjacentHTML('beforeend', `
        <h5 class="modal-title mb-3">
            Приветствую в приложении для управления задачами - ToDo
        </h5>
        <label class="form-group mb-3 d-block">
            <input class="form-control modal-input" name="name" type="text"
                placeholder="Введите ваше имя">
        </label>
        <div class="buttons-wrapper">
            <button class="btn btn-outline-primary mr-3" type="button">
                Сохранить
            </button>
            <button class="btn btn-outline-danger" type="button">
                Отмена
            </button>
        </div>
    `);

    modalOverlay.append(modalForm);

    return {
        modalOverlay,
        modalForm,
    };
};

