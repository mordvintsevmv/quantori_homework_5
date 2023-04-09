import App from "./components/App.js";

const load_items = () => {
    return JSON.parse(localStorage.getItem('items'))
}

const save_items = () => {
    localStorage.setItem('items', JSON.stringify(state.items))
}

const task_items = load_items() || [
    {id: 0, isChecked: true, title: 'Complete Homework #5', tag: 'work', date: new Date()},
    {id: 1, isChecked: false, title: 'Celebrate my birthday', tag: 'home', date: new Date(2023, 11, 13)},
    {id: 2, isChecked: false, title: 'Buy new eyeglasses', tag: 'health', date: new Date(2023, 3, 13)},
    {id: 3, isChecked: true, title: 'Watch "Manhattan" by Woody Allen ', tag: 'other', date: new Date(2023, 1, 25)},
    {id: 4, isChecked: false, title: 'Come up with a new joke', tag: 'other', date: new Date()},
    {id: 5, isChecked: true, title: 'Complete Homework #4', tag: 'work', date: new Date(2023, 3, 2)},
]

let state = {
    items: task_items,
    last_id: task_items.reduce((max, item) => max > item.id ? max : item.id, task_items[0].id),
    isModal: false
}

/**
 * Global application state
 * @template T
 * @param {T} initialValue
 * @returns {[T, function(T): void]}
 */
export const useState = (initialValue = undefined) => {
    state = state || initialValue;

    function setValue(newValue) {
        state = newValue;
        save_items();
        renderApp();
    }

    return [state, setValue];
}

/**
 * Render the app.
 * On change whole app is re-rendered.
 */
function renderApp() {
    const appContainer = document.getElementById("root");
    appContainer.innerHTML = '';
    appContainer.append(App());
}

// initial render
renderApp();
