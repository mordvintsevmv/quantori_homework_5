import TaskTag from "../TaskTag/TaskTag";
import {Component, ComponentProps} from "../../base_classes";

import "./TaskItem.scss"
import {Item} from "../../types/item";

import checkbox_unchecked_icon from '../../img/checkbox-unchecked.svg'
import checkbox_disabled_icon from "../../img/checkbox-disabled.svg"
import trash_icon from "../../img/delete-new-value.svg"

const month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

interface TaskItemProps extends ComponentProps {
    item: Item,
    deleteItem: (id: number) => void,
    checkItem: (id: number) => void
}

class TaskItem extends Component {
    constructor() {
        super();
    }

    render(props: TaskItemProps) {

        // Parsing date (for situations when there is string instead of Date)
        const parsed_date = new Date(Date.parse(props.item.date))

        // Creating text for date
        const today = new Date();

        let day_text;

        if (parsed_date.getFullYear() === today.getFullYear()
            && parsed_date.getMonth() === today.getMonth()
            && parsed_date.getDate() === today.getDate()
        ) {
            day_text = 'Today'
        } else if (parsed_date.getFullYear() === today.getFullYear()
            && parsed_date.getMonth() === today.getMonth()
            && parsed_date.getDate() - today.getDate() === 1
        ) {
            day_text = 'Tomorrow'
        } else if (parsed_date.getFullYear() === today.getFullYear()
            && parsed_date.getMonth() === today.getMonth()
            && parsed_date.getDate() - today.getDate() === -1
        ) {
            day_text = 'Yesterday'
        } else {
            day_text = `${day_array[parsed_date.getDay()]}, ${parsed_date.getDate()} ${month_array[parsed_date.getMonth()]}`
        }


        // Checkbox Button
        const checkbox_button = document.createElement('button')
        checkbox_button.classList.add('task-item__checkbox')

        const checkbox_img = document.createElement('img')
        if (props.item.isChecked) {
            checkbox_img.src = checkbox_disabled_icon
            checkbox_img.alt = 'Checkbox - uncheck'
            checkbox_img.classList.add('task-item__checkbox-img--checked')
        } else {
            checkbox_img.src = checkbox_unchecked_icon
            checkbox_img.alt = 'Checkbox - check'
            checkbox_img.classList.add('task-item__checkbox-img--unchecked')
        }

        checkbox_button.append(checkbox_img)
        checkbox_button.onclick = () => props.checkItem(props.item.id)

        // Info wrapper (Title, tag and date)
        const task_item_info = document.createElement('div')
        task_item_info.classList.add("task-item__info")

        // Title
        const task_item_title = document.createElement('h3')
        task_item_title.classList.add("task-item__title")
        task_item_title.innerText = props.item.title

        // Bottom wrapper (Tag and date)
        const task_item_bottom = document.createElement('div')
        task_item_bottom.classList.add("task-item__bottom")

        // Tag
        const task_item_tag = new TaskTag().render({name: props.item.tag, isColored: !props.item.isChecked})
        task_item_tag.classList.add("task-item__tag")

        // Date Text
        const task_item_date = document.createElement('div')
        task_item_date.classList.add("task-item__date")
        task_item_date.innerText = day_text

        // Delete Button
        const delete_button = document.createElement('button')
        delete_button.classList.add("task-item__delete")
        delete_button.onclick = () => props.deleteItem(props.item.id);

        const delete_button_img = document.createElement('img')
        delete_button_img.src = trash_icon
        delete_button_img.alt = 'delete'


        // Appending
        delete_button.append(delete_button_img)
        task_item_bottom.append(task_item_tag, task_item_date)
        task_item_info.append(task_item_title, task_item_bottom)

        let children = []

        if (props.item.isChecked) {
            children.push(checkbox_button, task_item_info)
        } else {
            children.push(checkbox_button, task_item_info, delete_button)
        }

        return super.render({
            children: children,
            className: ['task-item']
        });
    }
}

export default TaskItem