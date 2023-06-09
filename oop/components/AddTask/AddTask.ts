import {Component, ComponentProps} from "../../base_classes";
import Input from "../Input/Input";
import CustomCheckInput from "../CustomCheckInput/CustomCheckInput";
import TaskTag from "../TaskTag/TaskTag";
import Button from "../Button/Button";
import "./AddTask.scss"

interface AddTaskProps extends ComponentProps {
    closeModal: () => void,
    addTask: () => void,
    value: string
}

class AddTask extends Component {

    element: HTMLDivElement

    constructor() {
        super();
        this.element = document.createElement('div')
    }

    render(props: AddTaskProps): HTMLDivElement {

        // Title
        const add_task_title: HTMLHeadingElement = document.createElement('h3')
        add_task_title.classList.add('add-task__title')
        add_task_title.innerText = 'Add New Task'

        // Input
        const add_task_input: HTMLInputElement = new Input().render({
            placeholder: 'Task Title',
            id: 'add-task-input'
        })
        add_task_input.classList.add('add-task__input')

        add_task_input.value = props.value
        add_task_input.onkeyup = (event: KeyboardEvent): void => {

            const task_button: HTMLButtonElement = document.getElementById('add-task-button') as HTMLButtonElement
            const task_input: HTMLInputElement = event.target as HTMLInputElement

            if (task_input?.value && task_input?.value !== '') {
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
        const home_label: HTMLLabelElement = new CustomCheckInput().render({
            type: 'radio',
            name: 'tag',
            value: 'home',
            outline: '#639462',
            isDefault: false,
            input_element: new TaskTag().render({name: 'home', isColored: true}),
        })


        // Radio - Health Tag

        const health_label: HTMLLabelElement = new CustomCheckInput().render({
            type: 'radio',
            name: 'tag',
            value: 'health',
            outline: '#0053CF',
            isDefault: false,
            input_element: new TaskTag().render({name: 'health', isColored: true}),
        })

        // Radio - Work Tag
        const work_label: HTMLLabelElement = new CustomCheckInput().render({
            type: 'radio',
            name: 'tag',
            value: 'work',
            outline: '#9747FF',
            isDefault: false,
            input_element: new TaskTag().render({name: 'work', isColored: true}),
        })

        // Radio - Other Tag
        const other_label: HTMLLabelElement = new CustomCheckInput().render({
            type: 'radio',
            name: 'tag',
            value: 'other',
            outline: '#EA8C00',
            isDefault: true,
            input_element: new TaskTag().render({name: 'other', isColored: true}),
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
        const add_button: HTMLButtonElement = new Button().render({text: 'Add Task', onClick: props.addTask})
        add_button.classList.add('add-task__add-button')
        add_button.id = 'add-task-button'
        add_button.disabled = true

        // Cancel Button
        const cancel_button: HTMLButtonElement = new Button().render({
            text: 'Cancel',
            isTransparent: true,
            onClick: props.closeModal
        })
        cancel_button.classList.add('add-task__cancel-button')

        // Button Wrapper
        const button_wrapper: HTMLDivElement = document.createElement('div')
        button_wrapper.classList.add('add-task__buttons')

        button_wrapper.append(cancel_button, add_button)

        return super.render({
            children: [add_task_title, add_task_input, options, button_wrapper],
            className: ['add-task']
        }) as HTMLDivElement;
    }
}

export default AddTask