import TaskList from "./components/TaskList.js";
import SearchField from "./components/SearchField.js";
import Header from "./components/Header.js";
import Button from "./components/Button.js";

(function () {
    let state = undefined;

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(initialValue) {
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            renderApp();
        }

        return [state, setValue];
    }


    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function App() {
        const [items, setItems] = useState(
            [{id: 0, checked: false, title: 'First Task', tag: 'other', date: new Date()}]);

        function addItem() {
            setItems([...items, {id: items.length+1, checked: false, title: items.length+1 + ' Task', tag: 'other', date: new Date()}]);
        }

        const deleteItem = (id) => {
            setItems([...items.filter(item => item.id !== id)])
        }

        const checkItem = (id) => {
            const item_index = items.findIndex(item => item.id === id)

            const new_items = [...items]
            new_items[item_index] = {...new_items[item_index], checked: !new_items[item_index].checked}

            setItems(new_items)
        }

        const app_wrapper = document.createElement("div");
        app_wrapper.classList.add('app-wrapper')

        const in_work_items = items.filter(item => item.checked === false)
        const finished_items = items.filter(item => item.checked === true)

        const header = Header()
        const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
        const finished_task_list = TaskList({title: 'Completed Tasks', items: finished_items, deleteItem, checkItem});
        const search = SearchField();
        const button = Button({text: "+ New Item", onClick: addItem});

        app_wrapper.append(header, search, button, in_work_task_list, finished_task_list);
        return app_wrapper;
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
})();