const load_items = () => {
    return JSON.parse(localStorage.getItem('items'))
}

const task_items = load_items() || [
    {id: 0, isChecked: true, title: 'Complete Homework #5', tag: 'work', date: new Date()},
    {id: 1, isChecked: false, title: 'Celebrate my birthday', tag: 'home', date: new Date(2023, 11, 13)},
    {id: 2, isChecked: false, title: 'Buy new eyeglasses', tag: 'health', date: new Date(2023, 3, 13)},
    {id: 3, isChecked: true, title: 'Watch "Manhattan" by Woody Allen ', tag: 'other', date: new Date(2023, 1, 25)},
    {id: 4, isChecked: false, title: 'Come up with a new joke', tag: 'other', date: new Date()},
    {id: 5, isChecked: true, title: 'Complete Homework #4', tag: 'work', date: new Date(2023, 3, 2)},
]

class App extends Component {
    constructor() {
        super();
        this.state = {
            items: task_items,
            last_id: task_items.reduce((max, item) => max > item.id ? max : item.id, task_items[0].id),
            isModal: false
        }
    }

    render(props) {
        const in_work_items = this.state.items.filter(item => item.isChecked === false)
        const finished_items = this.state.items.filter(item => item.isChecked === true)

        const header = new Header().render({
            title: 'To Do List'
        })
        header.classList.add('app-wrapper__header')

        const input = new Input().render({
            placeholder: 'Search Task',
            id: 'search-input'
        })
        input.classList.add('app-wrapper__search')

        const add_button = new Button().render({
                text: '+ New Task',
                onClick: this.openModal})
        add_button.classList.add('app-wrapper__add-button')

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

        // Controls (Search and button)
        const controls = document.createElement('div')
        controls.classList.add('app-wrapper__controls')
        controls.append(input, add_button)

        let children = [ header, controls, in_work_list, finished_list,]

        if (this.state.isModal) {
            const modal = new Modal().render({
                closeModal: this.closeModal,
                children: new AddTask().render({
                    closeModal: this.closeModal,
                    addTask: this.addItem,
                    value: '',
                    setValueAddTaskInput: () => {
                    }
                })
            })
            modal.classList.add('app-wrapper__modal')

            children.push(modal)

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

        this.setState({
            ...this.state,
            items: [...this.state.items, {id: this.state.last_id + 1, isChecked: false, title: title, tag: tag, date: date}],
            last_id: this.state.last_id + 1,
            isModal: false
        })
    }

    deleteItem = (id) => {
        this.setState({...this.state, items: [...this.state.items.filter(item => item.id !== id)]})
    }

    openModal = () => {
        this.setState({...this.state, isModal: true})
    }

    closeModal = () => {
        this.setState({...this.state, isModal: false})
    }

    setValueAddTaskInput = (value) => {
        this.setState({...this.state, add_task_input: value})
    }

    checkItem = (id) => {
        const item_index = this.state.items.findIndex(item => item.id === id)

        const new_items = [...this.state.items]
        new_items[item_index] = {...new_items[item_index], isChecked: !new_items[item_index].isChecked}

        this.setState({...this.state, items: new_items})
    }

    save_items = () => {
        localStorage.setItem('items', JSON.stringify(this.state.items))
    }

}

document.body.appendChild(new App().render());