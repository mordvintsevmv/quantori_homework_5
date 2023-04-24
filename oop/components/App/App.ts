import AddTask from "../AddTask/AddTask";
import Modal from "../Modal/Modal";
import TaskList from "../TaskList/TaskList";
import {Component} from "../../base_classes";
import Header from "../Header/Header";
import TodayTasks from "../TodayTasks/TodayTasks";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {change_API_path, delete_item, load_items, post_item, update_item} from "../../api/itemsAPI";
import "./App.scss"
import {Item} from "../../types/item";


const isTodayTasksShown = (): boolean => {
    const shown_date: string = JSON.parse(localStorage.getItem('TodayTaskLastShown'))
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

interface AppState {
    items: Item[],
    last_id: number,
    isModal: boolean,
    search_input: string
}

class App extends Component {

    header: Header
    state: AppState;
    element: HTMLDivElement

    constructor() {
        super();
        this.state = {
            items: [],
            last_id: 0,
            isModal: false,
            search_input: ''
        }
        this.header = new Header()
        this.element = document.createElement("div")
    }

    async ComponentDidCreate(): Promise<void> {
        try {
            // Checking if localhost is available
            await fetch('http://localhost:3004/items')
        } catch (e) {
            console.error(e)
            // Switching to JSONbin server if localhost is unavailable
            change_API_path()
        }

        // Loading items from server
        await load_items()
            .then((items: Item[]): void => {
                this.setState({
                        ...this.state,
                        items: items,
                        last_id: items.reduce((max: number, item: Item): number => max > item.id ? max : item.id, items[0]?.id || 0),
                    }
                )
            })

        // Displaying TodayTask Modal if it is a first time for today
        if (!isTodayTasksShown() && !this.state.isModal) {
            const today_modal: HTMLDivElement = new Modal().render({
                closeModal: (): void => {
                    setTodayShown();
                    this.closeModal();
                },
                modal_children: new TodayTasks().render({
                    closeModal: this.closeModal,
                    setTodayShown: setTodayShown,
                    items: this.state.items
                })
            })

            today_modal.classList.add('app-wrapper__modal')

            this.element.append(today_modal)
        }

    }


    render(): HTMLDivElement {

        // Header component
        const header: HTMLDivElement = this.header.render({
            title: 'To Do List'
        })
        header.classList.add('app-wrapper__header')

        // Search Input Component
        const input: HTMLInputElement = new Input().render({
            placeholder: 'Search Task',
            id: 'search-input'
        })
        input.classList.add('app-wrapper__search')
        input.onkeyup = (event: KeyboardEvent): void => {
            const target: HTMLInputElement = event.target as HTMLInputElement
            this.setState({...this.state, search_input: target.value})
        }

        // New Item Button Component
        const add_button: HTMLButtonElement = new Button().render({
            text: '+ New Task',
            onClick: this.openModal
        })
        add_button.classList.add('app-wrapper__add-button')

        // Controls (Search and Button)
        const controls: HTMLDivElement = document.createElement('div')
        controls.classList.add('app-wrapper__controls')
        controls.append(input, add_button)

        // Item List Components
        const in_work_items: Item[] = this.state.items.filter(item => (item.isChecked === false) && (item.title.toLowerCase().replace(/\s+/g, '').includes(this.state.search_input.toLowerCase().replace(/\s+/g, '') || '')))
        const finished_items: Item[] = this.state.items.filter(item => item.isChecked === true)

        const in_work_list: HTMLDivElement = new TaskList().render({
            items: in_work_items,
            title: 'All Tasks',
            deleteItem: this.deleteItem,
            checkItem: this.checkItem,
            id: 'in-work-tasks'
        })
        in_work_list.classList.add('app-wrapper__list')

        const finished_list: HTMLDivElement = new TaskList().render({
            items: finished_items,
            title: 'Completed Tasks',
            deleteItem: this.deleteItem,
            checkItem: this.checkItem
        })
        finished_list.classList.add('app-wrapper__list')


        let children: HTMLDivElement[] = [header, controls, in_work_list, finished_list]


        // Modal Component
        if (this.state.isModal) {
            const add_modal: HTMLDivElement = new Modal().render({
                closeModal: this.closeModal,
                modal_children: new AddTask().render({
                    closeModal: this.closeModal,
                    addTask: this.addItem,
                    value: ''
                })
            })

            add_modal.classList.add('app-wrapper__modal')

            children.push(add_modal)
        }

        return super.render({
            children: children,
            className: ['app-wrapper']
        }) as HTMLDivElement;
    }

    addItem = async (): Promise<void> => {

        const title: HTMLInputElement = document.getElementById('add-task-input') as HTMLInputElement;
        const tag: HTMLInputElement = document.querySelector('input[name="tag"]:checked') as HTMLInputElement;
        const date: HTMLInputElement = document.getElementById('date-input') as HTMLInputElement

        await post_item({
            id: this.state.last_id + 1,
            isChecked: false,
            title: title.value,
            tag: tag.value,
            date: new Date(date.value).toString()
        })
            .then(async (): Promise<void> => {
                await load_items()
                    .then((items: Item[]): void => {
                        this.setState({
                                ...this.state,
                                items: items,
                                last_id: items.reduce((max: number, item: Item): number => max > item.id ? max : item.id, items[0]?.id || 0),
                                isModal: false
                            }
                        )
                    })
            })
            .catch(error => console.error(error))
    }


    deleteItem = async (id: number): Promise<void> => {
        await delete_item(id)
            .then(async (): Promise<void> => {
                await load_items()
                    .then((items: Item[]): void => {
                        this.setState({
                                ...this.state,
                                items: items,
                                last_id: items.reduce((max: number, item: Item): number => max > item.id ? max : item.id, items[0]?.id || 0),
                            }
                        )
                    })
            })
    }

    checkItem = async (id: number): Promise<void> => {

        const item_index: number = this.state.items.findIndex((item: Item): boolean => item.id === id)

        await update_item(id, {...this.state.items[item_index], isChecked: !this.state.items[item_index].isChecked})
            .then(async (): Promise<void> => {
                await load_items()
                    .then((items: Item[]): void => {
                        this.setState({
                                ...this.state,
                                items: items,
                                last_id: items.reduce((max: number, item: Item): number => max > item.id ? max : item.id, items[0]?.id || 0),
                            }
                        )
                    })
            })
    }

    openModal = (): void => {
        this.setState({...this.state, isModal: true})
    }

    closeModal = (): void => {
        this.setState({...this.state, isModal: false})
    }
}

export default App

