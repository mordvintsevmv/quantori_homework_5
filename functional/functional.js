import App from "./components/App.js";
import {load_items} from "../api/itemsAPI.js";

let state = {
    items: [],
    last_id: 0,
    isModal: false
}

load_items().then((items) => {
    state = {
        items: items,
        last_id: items.reduce((max, item) => max > item.id ? max : item.id, items[0]?.id || 0),
        isModal: false
    }
    renderApp()
})

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


