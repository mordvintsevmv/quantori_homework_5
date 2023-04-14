import Input from "./Input.js";
import Button from "./Button.js";
import TaskTag from "./TaskTag.js";
import CustomCheckInput from "./CustomCheckInput.js";

/**
 * Add Task component
 * @param closeModal {function}
 * @param addTask {function}
 * @param value {string}
 * @param setValueAddTaskInput {function}
 * @returns {HTMLDivElement} - Add Task element
 */
const AddTask = ({closeModal, addTask, value, setValueAddTaskInput}) => {

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

    add_task_input.value = value
    add_task_input.oninput = event =>{
        event.preventDefault();

        setValueAddTaskInput(event.target.value)

        if (event.target?.value && event.target?.value !== '') {
            document.getElementById('add-task-button').disabled = false
        } else {
            document.getElementById('add-task-button').disabled = true
        }
    }

    // Options Wrapper (Tag and Date)
    const options = document.createElement('div')
    options.classList.add('add-task__options')

    // Tag Options
    const tag_form = document.createElement('form')
    tag_form.classList.add('add-task__tag-list')

    // Radio - Home Tag
    const home_label = CustomCheckInput({
        name: 'tag',
        value: 'home',
        children: TaskTag({name: 'home'}),
        outline: '#639462'
    })

    // Radio - Health Tag
    const health_label = CustomCheckInput({
        name: 'tag',
        value: 'health',
        children: TaskTag({name: 'health'}),
        outline: '#0053CF'
    })

    // Radio - Work Tag
    const work_label = CustomCheckInput({
        name: 'tag',
        value: 'work',
        children: TaskTag({name: 'work'}),
        outline: '#9747FF'
    })

    // Radio - Other Tag
    const other_label = CustomCheckInput({
        name: 'tag',
        value: 'other',
        children: TaskTag({name: 'other'}),
        isDefault: true,
        outline: '#EA8C00'
    })

    // Appending Form
    tag_form.append(health_label, work_label, home_label, other_label)

    // Date Input
    const date_input = document.createElement('input')
    date_input.type = 'date'
    date_input.classList.add('add-task__date')
    date_input.id = 'date-input'
    date_input.valueAsDate = new Date();

    options.append(tag_form, date_input)

    // Add Button
    const add_button = Button({text: 'Add Task', onClick: addTask})
    add_button.classList.add('add-task__add-button')
    add_button.id = 'add-task-button'
    add_button.disabled = value === ''

    // Cancel Button
    const cancel_button = Button({text: 'Cancel', isTransparent: true, onClick: closeModal})
    cancel_button.classList.add('add-task__cancel-button')

    // Button Wrapper
    const button_wrapper = document.createElement('div')
    button_wrapper.classList.add('add-task__buttons')

    button_wrapper.append(cancel_button, add_button)

    add_task.append(add_task_title, add_task_input, options, button_wrapper)

    return add_task
}

export default AddTask