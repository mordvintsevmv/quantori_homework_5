import Header from "./Header.js";
import TaskList from "./TaskList.js";
import Input from "./Input.js";
import Button from "./Button.js";
import Modal from "./Modal.js";
import {useState} from "../functional.js";
import AddTask from "./AddTask.js";
import {delete_item, load_items, post_item, put_item} from "../../api/itemsAPI.js";
import {TodayTasks} from "./TodayTasks.js";

const isTodayTasksShown = () => {
    const shown_date = JSON.parse(localStorage.getItem('TodayTaskLastShown'))
    const today = new Date()

    const parsed_date = new Date(Date.parse(shown_date))

    if (shown_date) {

        if (parsed_date.getFullYear() === today.getFullYear()
            && parsed_date.getMonth() === today.getMonth()
            && parsed_date.getDate() === today.getDate()
        ) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

const setTodayShown = () => {
    localStorage.setItem('TodayTaskLastShown', JSON.stringify(new Date()))
}

/**
 * App container
 * @returns {HTMLDivElement} - The app container
 */
const App = () => {

    const [state, setState] = useState()

    const addItem = async () => {

        const title = document.getElementById('add-task-input').value
        const tag = document.querySelector('input[name="tag"]:checked').value;
        const date = new Date(document.getElementById('date-input').value);

        await post_item({
            id: state.last_id + 1,
            isChecked: false,
            title: title,
            tag: tag,
            date: date
        })
            .then(() =>
                load_items().then(items => {
                    setState({
                            ...state,
                            items: items,
                            last_id: items.reduce((max, item) => max > item.id ? max : item.id, [][0]?.id || 0),
                            isModal: false
                        }
                    )
                }))
            .catch(error => console.error(error))
    }


    const deleteItem = async (id) => {
        await delete_item(id).then(() => {
            load_items().then(items => {
                setState({
                        ...state,
                        items: items,
                        last_id: items.reduce((max, item) => max > item.id ? max : item.id, [][0]?.id || 0),
                    }
                )
            })
        })
    }

    const checkItem = async (id) => {

        const item_index = state.items.findIndex(item => item.id === id)

        await put_item(id, {...state.items[item_index], isChecked: !state.items[item_index].isChecked})
            .then(() => {
                load_items().then(items => {
                    setState({
                            ...state,
                            items: items,
                            last_id: items.reduce((max, item) => max > item.id ? max : item.id, [][0]?.id || 0),
                        }
                    )
                })
            })
    }

    const openModal = () => {
        setState({...state, isModal: true})
    }

    const closeModal = () => {
        setState({...state, isModal: false})
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
    search.onkeyup = event => {
        const in_work_items = state.items.filter(item => (item.isChecked === false) && (item.title.toLowerCase().replace(/\s+/g, '').includes(event.target?.value.toLowerCase().replace(/\s+/g, '') || '')))
        const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
        in_work_task_list.id = 'in-work-tasks'

        document.getElementById('in-work-tasks').replaceWith(in_work_task_list)
    }

    // Button Component
    const button = Button({text: "+ New Task", onClick: openModal});
    button.classList.add('app-wrapper__add-button')

    // Controls (Search and button)
    const controls = document.createElement('div')
    controls.classList.add('app-wrapper__controls')
    controls.append(search, button)

    // Task List Components
    const in_work_items = state.items.filter(item => item.isChecked === false)
    const finished_items = state.items.filter(item => item.isChecked === true)

    const in_work_task_list = TaskList({title: 'All Tasks', items: in_work_items, deleteItem, checkItem});
    const finished_task_list = TaskList({title: 'Completed Tasks', items: finished_items, deleteItem, checkItem});

    in_work_task_list.classList.add('app-wrapper__list')
    in_work_task_list.id = 'in-work-tasks'

    finished_task_list.classList.add('app-wrapper__list')

    // Modal Component
    const modal = Modal({closeModal: closeModal, children: AddTask({closeModal: closeModal, addTask: addItem})})
    modal.classList.add('app-wrapper__modal')

    app_wrapper.append(header, controls, in_work_task_list, finished_task_list);

    if (state.isModal) {
        app_wrapper.append(modal)
    }

    if (!isTodayTasksShown()){
        const today_tasks = TodayTasks({closeModal: closeModal, setTodayShown: setTodayShown, items: state.items})

        const today_modal = Modal({closeModal: () => {
                closeModal();
                setTodayShown()
            }, children: today_tasks}
        )

        today_modal.classList.add('app-wrapper__modal')

        app_wrapper.append(today_modal)
    }

    return app_wrapper;
}

export default App