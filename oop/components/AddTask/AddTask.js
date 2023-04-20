import {Component} from "../../base_classes.js";
import Input from "../Input/Input.js";
import CustomCheckInput from "../CustomCheckInput/CustomCheckInput.js";
import TaskTag from "../TaskTag/TaskTag.js";
import Button from "../Button/Button.js";
import "./AddTask.scss"

class AddTask extends Component {
    constructor() {
        super();
    }

    /**
     * @override
     * @param props
     * @param props.closeModal {function}
     * @param props.addTask {function}
     * @param props.value {string}
     * @param props.setValueAddTaskInput {function}
     * @returns {HTMLDivElement} - Add Task element
     * */
    render(props) {

        // Title
        const add_task_title = document.createElement('h3')
        add_task_title.classList.add('add-task__title')
        add_task_title.innerText = 'Add New Task'

        // Input
        const add_task_input = new Input().render({
            placeholder: 'Task Title',
            id: 'add-task-input'
        })
        add_task_input.classList.add('add-task__input')

        add_task_input.value = props.value
        add_task_input.onkeyup = event => {
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
        const home_label = new CustomCheckInput().render({
            name: 'tag',
            value: 'home',
            children: new TaskTag().render({name: 'home'}),
            outline: '#639462'
        })


        // Radio - Health Tag

        const health_label = new CustomCheckInput().render({
            name: 'tag',
            value: 'health',
            children: new TaskTag().render({name: 'health'}),
            outline: '#0053CF'
        })

        // Radio - Work Tag
        const work_label = new CustomCheckInput().render({
            name: 'tag',
            value: 'work',
            children: new TaskTag().render({name: 'work'}),
            outline: '#9747FF'
        })

        // Radio - Other Tag
        const other_label = new CustomCheckInput().render({
            name: 'tag',
            value: 'other',
            children: new TaskTag().render({name: 'other'}),
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
        const add_button = new Button().render({text: 'Add Task', onClick: props.addTask})
        add_button.classList.add('add-task__add-button')
        add_button.id = 'add-task-button'
        add_button.disabled = true

        // Cancel Button
        const cancel_button = new Button().render({text: 'Cancel', isTransparent: true, onClick: props.closeModal})
        cancel_button.classList.add('add-task__cancel-button')

        // Button Wrapper
        const button_wrapper = document.createElement('div')
        button_wrapper.classList.add('add-task__buttons')

        button_wrapper.append(cancel_button, add_button)

        return super.render({
            children: [add_task_title, add_task_input, options, button_wrapper],
            style: this.state.style,
            className: ['add-task']
        });
    }
}

export default AddTask