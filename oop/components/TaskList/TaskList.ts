import TaskItem from "../TaskItem/TaskItem";
import {Component, ComponentProps} from "../../base_classes";
import "./TaskList.scss"
import {Item} from "../../types/item";

interface TaskListProps extends ComponentProps{
    title: string,
    items: Item[],
    deleteItem: (id: number)=>void,
    checkItem: (id: number)=>void,
}

class TaskList extends Component {
    constructor() {
        super();
    }

    render(props: TaskListProps) {

        // Title
        const list_title = document.createElement('h2')
        list_title.classList.add('task-list__title')
        list_title.innerText = props.title

        // Items - array of li
        const list_items = props.items.map((item) => {
            const li = document.createElement('li')
            li.append(new TaskItem().render({
                    item: item,
                    deleteItem: props.deleteItem,
                    checkItem: props.checkItem
                }
            ))
            return li
        });

        // Items - ul
        const ul_wrapper = document.createElement('div')
        ul_wrapper.classList.add('task-list__items')
        const ul = document.createElement("ul");

        // Appending
        ul.append(...list_items);
        ul_wrapper.append(ul)

        return super.render({
            children: [list_title, ul_wrapper],
            className: ['task-list'],
            id: props.id
        });
    }
}

export default TaskList