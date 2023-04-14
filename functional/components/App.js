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
            isModal: false,
            add_task_input: ''
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

    const setValueAddTaskInput = (value) => {
        setState({...state, add_task_input: value, add_task_focus: true})
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

    // Header Component
    const header = Header({title: 'To Do List'})
    header.classList.add('app-wrapper__header')

    // Search Component
    const search = Input({placeholder: 'Search Task'});
    search.classList.add('app-wrapper__search')
    search.id = 'search-input'

    search.value = state.search_input
    search.oninput = event =>{
        event.preventDefault();
        setState({...state, search_input: event.target.value})
    }

    // Button Component
    const button = Button({text: "+ New Task", onClick: openModal});
    button.classList.add('app-wrapper__add-button')

    // Controls (Search and button)
    const controls = document.createElement('div')
    controls.classList.add('app-wrapper__controls')
    controls.append(search, button)

    // Task List Components
    const in_work_items = state.items.filter(item => (item.isChecked === false && item.title.toLowerCase().includes(state.search_input.toLowerCase().replace(/\s/g, ''))))
    const finished_items = state.items.filter(item => item.isChecked === true)

    const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
    const finished_task_list = TaskList({title: 'Completed Tasks', items: finished_items, deleteItem, checkItem});

    in_work_task_list.classList.add('app-wrapper__list')
    in_work_task_list.id = 'in-work-tasks'

    finished_task_list.classList.add('app-wrapper__list')

    // Modal Component
    const modal = Modal({closeModal: closeModal, children: AddTask({closeModal: closeModal, addTask: addItem, value: state.add_task_input, setValueAddTaskInput: setValueAddTaskInput})})
    modal.classList.add('app-wrapper__modal')

    app_wrapper.append(header, controls, in_work_task_list, finished_task_list);

    if (state.isModal) {
        app_wrapper.append(modal)
        console.log(state.add_task_focus)
    }

    return app_wrapper;
}

export default App