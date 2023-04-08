import TaskList from "./components/TaskList.js";
import Input from "./components/Input.js";
import Header from "./components/Header.js";
import Button from "./components/Button.js";
import Modal from "./components/Modal.js";

(function () {
    // let state = undefined;

    const load_items = () => {
        return JSON.parse(localStorage.getItem('items'))
    }

    const test_items = load_items() || [
        {id: 0, checked: false, title: 'First Task', tag: 'home', date: new Date()},
        {id: 1, checked: true, title: 'Second Task', tag: 'health', date: new Date()},
        {id: 2, checked: false, title: 'Third Task', tag: 'work', date: new Date()},
        {id: 3, checked: true, title: 'Fourth Task', tag: 'other', date: new Date()},
        {id: 4, checked: false, title: 'Fifth Task', tag: 'health', date: new Date()},
        {id: 5, checked: true, title: 'Six Task', tag: 'home', date: new Date()},
    ]

    let state = {
        items: test_items,
        last_id: test_items.reduce((max, item) => max > item.id ? max : item.id, test_items[0].id),
        isModal: false
    }

    const save_items = () => {
        localStorage.setItem('items', JSON.stringify(state.items))
    }

    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
    function useState(initialValue = undefined) {
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            save_items();
            renderApp();
        }

        return [state, setValue];
    }

    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
    function App() {

        const [state, setState] = useState()

        function addItem() {
            const title = document.getElementById('add-task-input').value
            const tag = document.querySelector('input[name="tag"]:checked').value;
            const date = new Date(document.getElementById('date-input').value);


            setState({
                ...state,
                items: [...state.items, {id: state.last_id + 1, checked: false, title: title, tag: tag, date: date}],
                last_id: state.last_id + 1,
                isModal: false
            })
        }

        const deleteItem = (id) => {
            setState({...state, items: [...state.items.filter(item => item.id !== id)]})
        }

        const openModal = () => {
            setState({...state, isModal: true})
        }

        const closeModal = () => {
            setState({...state, isModal: false})
        }

        const checkItem = (id) => {
            const item_index = state.items.findIndex(item => item.id === id)

            const new_items = [...state.items]
            new_items[item_index] = {...new_items[item_index], checked: !new_items[item_index].checked}

            setState({...state, items: new_items})
        }

        // App wrapper
        const app_wrapper = document.createElement("div");
        app_wrapper.classList.add('app-wrapper')

        // Filtering items by checked/unchecked
        const in_work_items = state.items.filter(item => (item.checked === false))
        const finished_items = state.items.filter(item => item.checked === true)

        // Creating Components
        const header = Header()
        header.classList.add('app-wrapper__header')

        const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
        const finished_task_list = TaskList({title: 'Completed Tasks', items: finished_items, deleteItem, checkItem});

        in_work_task_list.classList.add('app-wrapper__list', 'app-wrapper__list-in-work')
        in_work_task_list.id = 'in-work-tasks'

        finished_task_list.classList.add('app-wrapper__list', 'app-wrapper__list-finished')

        const search = Input({placeholder: 'Search Task'});
        search.classList.add('app-wrapper__search')
        search.id = 'search-input'
        search.onkeyup = event => {
            console.log(event.target?.value)

            const in_work_items = state.items.filter(item => (item.checked === false) && (item.title.toLowerCase().includes(event.target?.value.toLowerCase() || '')))
            const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
            in_work_task_list.id = 'in-work-tasks'

            console.log(in_work_task_list)

            document.getElementById('in-work-tasks').replaceWith(in_work_task_list)
        }

        const button = Button({text: "+ New Item", onClick: openModal});

        // Controls
        const controls = document.createElement('div')
        controls.classList.add('app-wrapper__controls')
        controls.append(search, button)

        // Modal
        const modal = Modal({closeModal: closeModal, addTask: addItem})
        modal.classList.add('app-wrapper__modal')

        app_wrapper.append(header, controls, in_work_task_list, finished_task_list);

        if (state.isModal) {
            app_wrapper.append(modal)
            app_wrapper.classList.add('app-wrapper--isModal')
        }

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