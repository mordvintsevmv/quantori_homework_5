import Input from "./Input.js";
import Button from "./Button.js";
import TaskTag from "./TaskTag.js";

/**
 * Add Task component
 * @param closeModal {function}
 * @param addTask {function}
 * @returns {HTMLDivElement} - Add Task element
 */
const AddTask = ({closeModal, addTask}) => {

    // Wrapper
    const add_task = document.createElement('div')
    add_task.classList.add('add-task')

    // Title
    const add_task_title = document.createElement('h3')
    add_task_title.classList.add('add-task__title')
    add_task_title.innerText = 'Add New Task'

    // Input
    const add_task_input = Input({placeholder: 'Task Title'})
    add_task_input.classList.add('add-task__input')
    add_task_input.id = 'add-task-input'
    add_task_input.onkeyup = (event) => {
        if (event.target?.value && event.target?.value !== ''){
            document.getElementById('add-task-button').disabled = false
        } else{
            document.getElementById('add-task-button').disabled = true
        }
    }

    // Add Button
    const add_button = Button({
        text: 'Add Task', onClick: () => {
        }
    })
    add_button.classList.add('add-task__add-button')
    add_button.id = 'add-task-button'
    add_button.onclick = () => {
        addTask()
    }
    add_button.disabled = true

    // Cancel Button
    const cancel_button = Button({
        text: 'Cancel', isTransparent: true, onClick: () => {
        }
    })
    cancel_button.classList.add('add-task__cancel-button')
    cancel_button.onclick = () => closeModal()

    // Options Wrapper
    const options = document.createElement('div')
    options.classList.add('add-task__options')

    // Tag Options
    const tag_form = document.createElement('form')
    tag_form.classList.add('add-task__tag-list')

    // Home Tag
    const home_label = document.createElement('label')

    const home_tag = document.createElement('input')
    home_tag.type = 'radio'
    home_tag.name = 'tag'
    home_tag.value = 'home'

    const home_div = TaskTag({name: 'home'})
    home_div.classList.add('add-task__tag')

    home_label.append(home_tag, home_div)

    // Health Tag
    const health_label = document.createElement('label')

    const health_tag = document.createElement('input')
    health_tag.type = 'radio'
    health_tag.name = 'tag'
    health_tag.value = 'health'

    const health_div = TaskTag({name: 'health'})
    health_div.classList.add('add-task__tag')


    health_label.append(health_tag, health_div)

    // Work Tag
    const work_label = document.createElement('label')

    const work_tag = document.createElement('input')
    work_tag.type = 'radio'
    work_tag.name = 'tag'
    work_tag.value = 'work'

    const work_div = TaskTag({name: 'work'})
    work_div.classList.add('add-task__tag')

    work_label.append(work_tag, work_div)

    // Other Tag
    const other_label = document.createElement('label')

    const other_tag = document.createElement('input')
    other_tag.type = 'radio'
    other_tag.name = 'tag'
    other_tag.value = 'other'
    other_tag.defaultChecked = true

    const other_div = TaskTag({name: 'other'})
    other_div.classList.add('add-task__tag')

    other_label.append(other_tag, other_div)

    // Appending Form
    tag_form.append(health_label, work_label, home_label, other_label)

    // Date Input
    const date_input = document.createElement('input')
    date_input.type = 'date'
    date_input.classList.add('add-task__date')
    date_input.id = 'date-input'
    date_input.valueAsDate = new Date();

    options.append(tag_form, date_input)

    // Button Wrapper
    const button_wrapper = document.createElement('div')
    button_wrapper.classList.add('add-task__buttons')

    button_wrapper.append(cancel_button, add_button)

    add_task.append(add_task_title, add_task_input, options, button_wrapper)

    return add_task
}

export default AddTask