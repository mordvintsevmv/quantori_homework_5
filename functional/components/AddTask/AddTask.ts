import Input from "../Input/Input";
import Button from "../Button/Button";
import TaskTag from "../TaskTag/TaskTag";
import CustomCheckInput from "../CustomCheckInput/CustomCheckInput";

import "./AddTask.css"

interface AddTaskProps {
    closeModal: () => void,
    addTask: () => void
}

const AddTask = ({closeModal, addTask}: AddTaskProps): HTMLDivElement => {

    // Wrapper
    const add_task: HTMLDivElement = document.createElement('div')
    add_task.classList.add('add-task')

    // Title
    const add_task_title: HTMLHeadingElement = document.createElement('h3')
    add_task_title.classList.add('add-task__title')
    add_task_title.innerText = 'Add New Task'

    // Input
    const add_task_input: HTMLInputElement = Input({placeholder: 'Task Title'})
    add_task_input.classList.add('add-task__input')
    add_task_input.id = 'add-task-input'
    add_task_input.onkeyup = (event: KeyboardEvent): void => {

        const task_button: HTMLButtonElement = document.getElementById('add-task-button') as HTMLButtonElement
        const task_input: HTMLInputElement = event.target as HTMLInputElement

        if (task_input.value && task_input.value !== '') {
            task_button.disabled = false
        } else {
            task_button.disabled = true
        }
    }

    // Options Wrapper (Tag and Date)
    const options: HTMLDivElement = document.createElement('div')
    options.classList.add('add-task__options')

    // Tag Options
    const tag_form: HTMLFormElement = document.createElement('form')
    tag_form.classList.add('add-task__tag-list')

    // Radio - Home Tag
    const home_label: HTMLLabelElement = CustomCheckInput({
        name: 'tag',
        value: 'home',
        input_element: TaskTag({name: 'home'}),
        outline: '#639462'
    })

    // Radio - Health Tag
    const health_label: HTMLLabelElement = CustomCheckInput({
        name: 'tag',
        value: 'health',
        input_element: TaskTag({name: 'health'}),
        outline: '#0053CF'
    })

    // Radio - Work Tag
    const work_label: HTMLLabelElement = CustomCheckInput({
        name: 'tag',
        value: 'work',
        input_element: TaskTag({name: 'work'}),
        outline: '#9747FF'
    })

    // Radio - Other Tag
    const other_label: HTMLLabelElement = CustomCheckInput({
        name: 'tag',
        value: 'other',
        input_element: TaskTag({name: 'other'}),
        isDefault: true,
        outline: '#EA8C00'
    })

    // Appending Form
    tag_form.append(health_label, work_label, home_label, other_label)

    // Date Input
    const date_input: HTMLInputElement = document.createElement('input')
    date_input.type = 'date'
    date_input.classList.add('add-task__date')
    date_input.id = 'date-input'
    date_input.valueAsDate = new Date();

    options.append(tag_form, date_input)

    // Add Button
    const add_button: HTMLButtonElement = Button({text: 'Add Task', onClick: addTask})
    add_button.classList.add('add-task__add-button')
    add_button.id = 'add-task-button'
    add_button.disabled = true

    // Cancel Button
    const cancel_button: HTMLButtonElement = Button({text: 'Cancel', isTransparent: true, onClick: closeModal})
    cancel_button.classList.add('add-task__cancel-button')

    // Button Wrapper
    const button_wrapper: HTMLDivElement = document.createElement('div')
    button_wrapper.classList.add('add-task__buttons')

    button_wrapper.append(cancel_button, add_button)

    add_task.append(add_task_title, add_task_input, options, button_wrapper)

    return add_task
}

export default AddTask