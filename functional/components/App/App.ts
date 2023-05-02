import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {useState} from "../../functional";
import AddTask from "../AddTask/AddTask";
import {delete_item, load_items, post_item, update_item} from "../../api/itemsAPI";
import TodayTasks from "../TodayTasks/TodayTasks";

import "./App.css"
import {State} from "../../types/State";
import {Item} from "../../types/Item";

const isTodayTasksShown = (): boolean => {
    const shown_date = JSON.parse(localStorage.getItem('TodayTaskLastShown'))

    const today: Date = new Date()
    const parsed_date: Date = new Date(Date.parse(shown_date))

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

const setTodayShown = (): void => {
    localStorage.setItem('TodayTaskLastShown', JSON.stringify(new Date()))
}

const App = (): HTMLDivElement => {

    const [state, setState]: [state: State, setState: (newState: State) => void] = useState()

    const addItem = async (): Promise<void> => {

        const title: HTMLInputElement = document.getElementById('add-task-input') as HTMLInputElement;
        const tag: HTMLInputElement = document.querySelector('input[name="tag"]:checked') as HTMLInputElement;
        const date: HTMLInputElement = document.getElementById('date-input') as HTMLInputElement

        await post_item({
            id: crypto.randomUUID(),
            isChecked: false,
            title: title.value,
            tag: tag.value,
            date: new Date(date.value).toString()
        })
            .then(async (): Promise<void> => {
                await load_items()
                    .then((items: Item[]): void => {
                        setState({
                                ...state,
                                items: items,
                                isModal: false
                            }
                        )
                    })
            })
            .catch(error => console.error(error))
    }


    const deleteItem = async (id: string): Promise<void> => {
        await delete_item(id)
            .then(async (): Promise<void> => {
                await load_items()
                    .then((items: Item[]): void => {
                        setState({
                                ...state,
                                items: items,
                            }
                        )
                    })
            })
    }

    const checkItem = async (id: string): Promise<void> => {

        const item_index: number = state.items.findIndex((item: Item): boolean => item.id === id)

        await update_item(id, {...state.items[item_index], isChecked: !state.items[item_index].isChecked})
            .then(async (): Promise<void> => {
                await load_items()
                    .then((items: Item[]): void => {
                        setState({
                                ...state,
                                items: items,
                            }
                        )
                    })
            })
    }

    const openModal = (): void => {
        setState({...state, isModal: true})
    }

    const closeModal = (): void => {
        setState({...state, isModal: false})
    }

    // App wrapper
    const app_wrapper: HTMLDivElement = document.createElement("div");
    app_wrapper.classList.add('app-wrapper')

    // Header Component
    const header: HTMLDivElement = Header({title: 'To Do List'})
    header.classList.add('app-wrapper__header')

    // Search Component
    const search: HTMLInputElement = Input({placeholder: 'Search Task'});
    search.classList.add('app-wrapper__search')
    search.id = 'search-input'
    search.onkeyup = (event: KeyboardEvent): void => {

        const search_input: HTMLInputElement = event.target as HTMLInputElement

        const in_work_items: Item[] = state.items.filter((item: Item): boolean => (item.isChecked === false) && (item.title.toLowerCase().replace(/\s+/g, '').includes(search_input?.value.toLowerCase().replace(/\s+/g, '') || '')))
        const in_work_task_list: HTMLDivElement = TaskList({
            title: 'All Tasks',
            items: in_work_items,
            deleteItem: deleteItem,
            checkItem: checkItem
        });
        in_work_task_list.id = 'in-work-tasks'

        document.getElementById('in-work-tasks').replaceWith(in_work_task_list)
    }

    // Button Component
    const button: HTMLButtonElement = Button({text: "+ New Task", onClick: openModal});
    button.classList.add('app-wrapper__add-button')

    // Controls (Search and button)
    const controls: HTMLDivElement = document.createElement('div')
    controls.classList.add('app-wrapper__controls')
    controls.append(search, button)

    // Task List Components
    const in_work_items: Item[] = state.items.filter((item: Item): boolean => item.isChecked === false)
    const finished_items: Item[] = state.items.filter((item: Item): boolean => item.isChecked === true)

    const in_work_task_list: HTMLDivElement = TaskList({
        title: 'All Tasks',
        items: in_work_items,
        deleteItem: deleteItem,
        checkItem: checkItem
    });
    const finished_task_list: HTMLDivElement = TaskList({
        title: 'Completed Tasks',
        items: finished_items,
        deleteItem: deleteItem,
        checkItem: checkItem
    });

    in_work_task_list.classList.add('app-wrapper__list')
    in_work_task_list.id = 'in-work-tasks'

    finished_task_list.classList.add('app-wrapper__list')

    // Modal Component
    const modal: HTMLDivElement = Modal({
        closeModal: closeModal,
        modal_children: AddTask({closeModal: closeModal, addTask: addItem})
    })
    modal.classList.add('app-wrapper__modal')

    app_wrapper.append(header, controls, in_work_task_list, finished_task_list);

    if (state.isModal) {
        app_wrapper.append(modal)
    }

    if (!isTodayTasksShown() && !state.isModal) {
        const today_tasks: HTMLDivElement = TodayTasks({
            closeModal: closeModal,
            setTodayShown: setTodayShown,
            items: state.items
        })

        const today_modal: HTMLDivElement = Modal({
                closeModal: (): void => {
                    setTodayShown();
                    closeModal();
                },
                modal_children: today_tasks
            }
        )

        today_modal.classList.add('app-wrapper__modal')

        app_wrapper.append(today_modal)
    }

    return app_wrapper;
}

export default App