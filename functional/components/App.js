import Header from "./Header.js";
import TaskList from "./TaskList.js";
import Input from "./Input.js";
import Button from "./Button.js";
import Modal from "./Modal.js";
import {useState} from "../functional.js";
import AddTask from "./AddTask.js";

/**
 * App container
 * @returns {HTMLDivElement} - The app container
 */
const App = () => {

    const [state, setState] = useState()

    function addItem() {
        const title = document.getElementById('add-task-input').value
        const tag = document.querySelector('input[name="tag"]:checked').value;
        const date = new Date(document.getElementById('date-input').value);

        setState({
            ...state,
            items: [...state.items, {id: state.last_id + 1, isChecked: false, title: title, tag: tag, date: date}],
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
        new_items[item_index] = {...new_items[item_index], isChecked: !new_items[item_index].isChecked}

        setState({...state, items: new_items})
    }

    // App wrapper
    const app_wrapper = document.createElement("div");
    app_wrapper.classList.add('app-wrapper')

    // Filtering items by checked/unchecked
    const in_work_items = state.items.filter(item => item.isChecked === false)
    const finished_items = state.items.filter(item => item.isChecked === true)

    // Creating Components
    const header = Header()
    header.classList.add('app-wrapper__header')

    const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
    const finished_task_list = TaskList({title: 'Completed Tasks', items: finished_items, deleteItem, checkItem});

    in_work_task_list.classList.add('app-wrapper__list')
    in_work_task_list.id = 'in-work-tasks'

    finished_task_list.classList.add('app-wrapper__list')

    const search = Input({placeholder: 'Search Task'});
    search.classList.add('app-wrapper__search')
    search.id = 'search-input'
    search.onkeyup = event => {
        const in_work_items = state.items.filter(item => (item.isChecked === false) && (item.title.toLowerCase().replace(/\s+/g, '').includes(event.target?.value.toLowerCase().replace(/\s+/g, '') || '')))
        const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
        in_work_task_list.id = 'in-work-tasks'

        document.getElementById('in-work-tasks').replaceWith(in_work_task_list)
    }

    const button = Button({text: "+ New Item", onClick: openModal});

    // Controls
    const controls = document.createElement('div')
    controls.classList.add('app-wrapper__controls')
    controls.append(search, button)

    // Modal
    const modal = Modal({closeModal: closeModal, children: AddTask({closeModal: closeModal, addTask: addItem})})
    modal.classList.add('app-wrapper__modal')

    app_wrapper.append(header, controls, in_work_task_list, finished_task_list);

    if (state.isModal) {
        app_wrapper.append(modal)
    }

    return app_wrapper;
}

export default App