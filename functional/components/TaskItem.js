/**
 * Task Item component
 * @param id {number}
 * @param checked {boolean}
 * @param title {string}
 * @param tag {string}
 * @param date {string}
 * @param deleteItem {function}
 * @param checkItem {function}
 * @returns {HTMLDivElement} - HTML code for TaskItem element
 */
const month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const TaskItem = ({id, checked, title, tag, date}, deleteItem, checkItem) => {

    const today = new Date();

    let day_text;

    const parsed_date = new Date(Date.parse(date))

    if (parsed_date.getFullYear() === today.getFullYear()
        && parsed_date.getMonth() === today.getMonth()
        && parsed_date.getDate() === today.getDate()
    ) {
        day_text = 'Today'
    } else if (parsed_date.getFullYear() === today.getFullYear()
        && parsed_date.getMonth() === today.getMonth()
        && parsed_date.getDate() - today.getDate() === 1
    ){
        day_text = 'Tomorrow'
    } else if (parsed_date.getFullYear() === today.getFullYear()
        && parsed_date.getMonth() === today.getMonth()
        && parsed_date.getDate() - today.getDate() === -1
    ){
        day_text = 'Yesterday'
    } else {
        day_text = `${day_array[parsed_date.getDay()]}, ${parsed_date.getDate()} ${month_array[parsed_date.getMonth()]}`
    }

    // Item wrapper
    const task_item = document.createElement('div')
    task_item.classList.add('task-item')

    // Checkbox image
    const checkbox_wrapper = document.createElement('div')
    checkbox_wrapper.classList.add('task-item__checkbox')
    const task_item_checkbox = document.createElement('img')
    if (checked){
        task_item_checkbox.src = 'img/checkbox-disabled.svg'
        task_item_checkbox.alt = 'Checkbox - uncheck'
    } else{
        task_item_checkbox.src = 'img/checkbox-unchecked.svg'
        task_item_checkbox.alt = 'Checkbox - check'
    }

    checkbox_wrapper.append(task_item_checkbox)
    checkbox_wrapper.onclick = () => checkItem(id)

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
    const task_item_tag = document.createElement('div')
    task_item_tag.classList.add("task-task-item__tag", 'task-tag')
    task_item_tag.innerText = tag

    if (!checked) {
        if (tag === 'home') {
            task_item_tag.classList.add("task-tag--green")
        } else if (tag === 'health') {
            task_item_tag.classList.add("task-tag--blue")
        } else if (tag === 'work') {
            task_item_tag.classList.add("task-tag--purple")
        } else {
            task_item_tag.classList.add("task-tag--orange")
        }
    }

    // Date
    const task_item_date = document.createElement('div')
    task_item_date.classList.add("task-item__date")
    task_item_date.innerText = day_text

    // Delete
    const delete_wrapper = document.createElement('div')
    delete_wrapper.classList.add("task-item__delete")
    delete_wrapper.onclick = () => deleteItem(id);

    const task_item_delete = document.createElement('img')
    task_item_delete.src = 'img/delete-new-value.svg'
    task_item_delete.alt = 'delete'

    delete_wrapper.append(task_item_delete)

    // Appending
    task_item_bottom.append(task_item_tag, task_item_date)
    task_item_info.append(task_item_title, task_item_bottom)

    if(checked){
        task_item.append(checkbox_wrapper, task_item_info)
    } else{
        task_item.append(checkbox_wrapper, task_item_info, delete_wrapper)
    }

    return task_item
}

export default TaskItem