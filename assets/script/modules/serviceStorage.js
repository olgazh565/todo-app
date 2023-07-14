export const getStorage = key => (JSON.parse(localStorage.getItem(key)) || []);

export const setStorage = (key, obj) => {
    const data = getStorage(key);
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = (key, id) => {
    const data = getStorage(key);
    const newData = data.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
};

export const changeStorageComplete = (key, id) => {
    const data = getStorage(key);
    const newData = data.map((item) => (
        item.id === id ?
        {
            ...item,
            status: 'Выполнена',
            priority: 'table-success',
        } : item
    ));
    localStorage.setItem(key, JSON.stringify(newData));
};

export const changeStorageEdit = (key, id, task) => {
    const data = getStorage(key);
    const newData = data.map((item) => (
        item.id === id ?
        {
            ...item,
            task,
        } : item
    ));
    localStorage.setItem(key, JSON.stringify(newData));
};


