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





class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            last_id: 0,
            isModal: false,
            search_input: ''
        }
        this.header = new Header()
    }

    setState(state) {
        super.setState(state);
    }

    async ComponentDidCreate() {
        try{
            await fetch('http://localhost:3004/items')
        } catch (e){
            console.error(e)
            change_API_path()
        }

        await load_items()
            .then(items => {
                this.setState({
                        ...this.state,
                        items: items,
                        last_id: items.reduce((max, item) => max > item.id ? max : item.id, items[0]?.id || 0),
                    }
                )
            })
    }


    render(props) {

        // Header component
        const header = this.header.render({
            title: 'To Do List'
        })
        header.classList.add('app-wrapper__header')

        // Search Input Component
        const input = new Input().render({
            placeholder: 'Search Task',
            id: 'search-input'
        })
        input.classList.add('app-wrapper__search')
        input.onkeyup = event => {
            this.setState({...this.state, search_input: event.target.value})
        }

        // New Item Button Component
        const add_button = new Button().render({
            text: '+ New Task',
            onClick: this.openModal
        })
        add_button.classList.add('app-wrapper__add-button')

        // Controls (Search and Button)
        const controls = document.createElement('div')
        controls.classList.add('app-wrapper__controls')
        controls.append(input, add_button)

        // Item List Components
        const in_work_items = this.state.items.filter(item => (item.isChecked === false) && (item.title.toLowerCase().replace(/\s+/g, '').includes(this.state.search_input.toLowerCase().replace(/\s+/g, '') || '')))
        const finished_items = this.state.items.filter(item => item.isChecked === true)

        const in_work_list = new TaskList().render({
            items: in_work_items,
            title: 'All Tasks',
            deleteItem: this.deleteItem,
            checkItem: this.checkItem,
            id: 'in-work-tasks'
        })
        in_work_list.classList.add('app-wrapper__list')

        const finished_list = new TaskList().render({
            items: finished_items,
            title: 'Completed Tasks',
            deleteItem: this.deleteItem,
            checkItem: this.checkItem
        })
        finished_list.classList.add('app-wrapper__list')


        let children = [header, controls, in_work_list, finished_list]

        if (!isTodayTasksShown()) {
            const today_modal = new Modal().render({
                closeModal: () => {
                    this.closeModal();
                    setTodayShown()
                },
                children: new TodayTasks().render({
                    closeModal: this.closeModal,
                    setTodayShown: setTodayShown,
                    items: this.state.items
                })
            })

            today_modal.classList.add('app-wrapper__modal')

            children.push(today_modal)
        }

        // Modal Component
        if (this.state.isModal) {
            const add_modal = new Modal().render({
                closeModal: this.closeModal,
                children: new AddTask().render({
                    closeModal: this.closeModal,
                    addTask: this.addItem,
                    value: '',
                })
            })

            add_modal.classList.add('app-wrapper__modal')

            children.push(add_modal)
        }

        return super.render({
            children: children,
            className: ['app-wrapper']
        });
    }

    addItem = () => {

        const title = document.getElementById('add-task-input').value
        const tag = document.querySelector('input[name="tag"]:checked').value;
        const date = new Date(document.getElementById('date-input').value);

        post_item({
            id: this.state.last_id + 1,
            isChecked: false,
            title: title,
            tag: tag,
            date: date
        })
            .then(() =>
                load_items().then(items => {
                this.setState({
                        ...this.state,
                        items: items,
                        last_id: items.reduce((max, item) => max > item.id ? max : item.id, [][0]?.id || 0),
                        isModal: false
                    }
                )
            }))
            .catch(error => console.error(error))
    }


    deleteItem = (id) => {
        delete_item(id).then(() => {
            load_items().then(items => {
                this.setState({
                        ...this.state,
                        items: items,
                        last_id: items.reduce((max, item) => max > item.id ? max : item.id, [][0]?.id || 0),
                    }
                )
            })
        })
    }

    checkItem = (id) => {

        const item_index = this.state.items.findIndex(item => item.id === id)

        update_item(id, {...this.state.items[item_index], isChecked: !this.state.items[item_index].isChecked})
            .then(() =>
                load_items().then(items => {
                    this.setState({
                            ...this.state,
                            items: items,
                            last_id: items.reduce((max, item) => max > item.id ? max : item.id, [][0]?.id || 0),
                        }
                    )
                }))
    }

    openModal = () => {
        this.setState({...this.state, isModal: true})
    }

    closeModal = () => {
        this.setState({...this.state, isModal: false})
    }


}

document.body.appendChild(new App().render());