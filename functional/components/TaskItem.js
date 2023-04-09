import TaskTag from "./TaskTag.js";

const month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/**
 * Task Item component
 * @param id {number}
 * @param isChecked {boolean}
 * @param title {string}
 * @param tag {string}
 * @param date {string | Date}
 * @param deleteItem {function}
 * @param checkItem {function}
 * @returns {HTMLDivElement} - HTML code for TaskItem element
 */
const TaskItem = ({id, isChecked, title, tag, date}, deleteItem, checkItem) => {

    // Parsing date (for situations when there is string instead of Date)
    const parsed_date = new Date(Date.parse(date))

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

    // Item wrapper
    const task_item = document.createElement('div')
    task_item.classList.add('task-item')

    // Checkbox Button
    const checkbox_button = document.createElement('button')
    checkbox_button.classList.add('task-item__checkbox')

    const checkbox_img = document.createElement('img')
    if (isChecked) {
        checkbox_img.src = 'img/checkbox-disabled.svg'
        checkbox_img.alt = 'Checkbox - uncheck'
        checkbox_img.classList.add('task-item__checkbox-img--checked')
    } else {
        checkbox_img.src = 'img/checkbox-unchecked.svg'
        checkbox_img.alt = 'Checkbox - check'
        checkbox_img.classList.add('task-item__checkbox-img--unchecked')
    }

    checkbox_button.append(checkbox_img)
    checkbox_button.onclick = () => checkItem(id)

    // Info wrapper (Title, tag and date)
    const task_item_info = document.createElement('div')
    task_item_info.classList.add("task-item__info")

    // Title
    const task_item_title = document.createElement('h3')
    task_item_title.classList.add("task-item__title")
    task_item_title.innerText = title

    // Bottom wrapper (Tag and date)
    const task_item_bottom = document.createElement('div')
    task_item_bottom.classList.add("task-item__bottom")

    // Tag
    const task_item_tag = TaskTag({name: tag, isColored: !isChecked})
    task_item_tag.classList.add("task-item__tag")

    // Date Text
    const task_item_date = document.createElement('div')
    task_item_date.classList.add("task-item__date")
    task_item_date.innerText = day_text

    // Delete Button
    const delete_button = document.createElement('button')
    delete_button.classList.add("task-item__delete")
    delete_button.onclick = () => deleteItem(id);

    const delete_button_img = document.createElement('img')
    delete_button_img.src = 'img/delete-new-value.svg'
    delete_button_img.alt = 'delete'


    // Appending
    delete_button.append(delete_button_img)
    task_item_bottom.append(task_item_tag, task_item_date)
    task_item_info.append(task_item_title, task_item_bottom)

    if (isChecked) {
        task_item.append(checkbox_button, task_item_info)
    } else {
        task_item.append(checkbox_button, task_item_info, delete_button)
    }

    return task_item
}

export default TaskItem