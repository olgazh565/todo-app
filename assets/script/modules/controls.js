import {
    addTaskPage,
    renderTasks,
    renderToDoApp,
    renderModal,
} from './render.js';

import {
    getStorage,
    setStorage,
    removeStorage,
    changeStorageComplete,
    changeStorageEdit,
} from './serviceStorage.js';

const addFocus = () => {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => input.focus());
};

const blockFormBtns = () => {
    const formBtns = document.querySelectorAll('.btn-primary, .btn-warning');
    formBtns.forEach(btn => btn.disabled = true);

    return {formBtns};
};

const buttonsControl = () => {
    const input = document.querySelector('.form-input');
    const {formBtns} = blockFormBtns();

    input.addEventListener('input', () => {
        if (input.value.length > 0) {
            formBtns.forEach(btn => btn.disabled = false);
        } else {
            blockFormBtns();
        }
    });
};

const resetControl = (form) => {
    const resetBtn = document.querySelector('.btn-warning');
    resetBtn.addEventListener('click', () => {
        form.reset();
        blockFormBtns();
    });
};

const formControl = (key, form, list) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.set('id', Math.random().toString().substring(2, 10));
        formData.set('status', 'В процессе');

        const newTask = Object.fromEntries(formData);
        console.log('newTask: ', newTask);

        addTaskPage(newTask, list);
        setStorage(key, newTask);
        blockFormBtns();
        form.reset();
    });
};

const deleteTask = (key, list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.btn-danger')) {
            const removedTask = target.closest('tr');
            const confirmDelete = confirm('Вы точно хотите удалить задачу?');

            if (confirmDelete) {
                removedTask.remove();
                removeStorage(key, removedTask.id);
            }
            return;
        }
    });
};

const completeTask = (key, list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.btn-success')) {
            const changedTask = target.closest('tr');

            changedTask.className = 'table-success';
            changedTask.cells[1].classList.add('text-decoration-line-through');
            changedTask.cells[2].textContent = 'Выполнена';

            target.disabled = true;
            target.nextElementSibling.disabled = true;

            changeStorageComplete(key, changedTask.id);
        }
    });
};

const editTask = (key, list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.btn-secondary')) {
            const editedTask = target.closest('tr');

            editedTask.cells[1].setAttribute('contenteditable', 'true');
            editedTask.cells[1].tabIndex = 0;
            editedTask.cells[1].focus();
        }
    });

    list.addEventListener('focusout', e => {
        const target = e.target;
        if (target.getAttribute('contenteditable')) {
            const editedTask = target.closest('tr');

            target.setAttribute('contenteditable', 'false');
            target.tabIndex = '';

            changeStorageEdit(key, editedTask.id, target.textContent);
        }
    });
};

const modalControl = () => {
    const {modalOverlay, modalForm} = renderModal();

    const openModal = () => {
        modalOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('is-visible');
    };

    window.addEventListener('load', () => {
        openModal();
        setTimeout(addFocus, 100);
    });

    return {
        closeModal,
        modalOverlay,
        modalForm,
    };
};

const init = key => {
    const data = getStorage(key);
    const {form, list} = renderToDoApp(key);
    setTimeout(addFocus, 400);
    blockFormBtns();
    buttonsControl();
    resetControl(form);
    formControl(key, form, list);
    renderTasks(data, list);
    deleteTask(key, list);
    completeTask(key, list);
    editTask(key, list);
};

export const initToDo = () => {
    const {closeModal, modalOverlay, modalForm} = modalControl();
    const userName = document.querySelector('.modal-input');

    modalOverlay.addEventListener('click', (e) => {
        const target = e.target;

        if (userName.value.length > 0) {
            if (target.closest('.btn-outline-primary')) {
                closeModal();
                init(userName.value);
            } else if (target.closest('.btn-outline-danger')) {
                modalForm.reset();
            }
        }
        userName.focus();
    });

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && userName.value.length > 0) {
            closeModal();
            init(userName.value);
        }
    });
};
