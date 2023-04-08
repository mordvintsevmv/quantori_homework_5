import Input from "./Input.js";
import Button from "./Button.js";

/**
 * Button component
 * @param closeModal {function}
 * @param addTask {function}
 * @returns {HTMLDivElement} - Modal element
 */
const Modal = ({closeModal, addTask}) => {

    // Overlay
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')

    // Modal wrapper
    const modal = document.createElement('div')
    modal.classList.add('modal')

    // Title
    const modal_title = document.createElement('h3')
    modal_title.classList.add('modal__title')
    modal_title.innerText = 'Add New Task'

    // Input
    const modal_input = Input({placeholder: 'Task Title'})
    modal_input.classList.add('modal__input')
    modal_input.id = 'add-task-input'

    // Add Button
    const add_button = Button({
        text: 'Add Task', onClick: () => {
        }
    })
    add_button.classList.add('modal__add-button')
    add_button.onclick = () => {
        addTask()
    }

    // Cancel Button
    const cancel_button = Button({
        text: 'Cancel', isTransparent: true, onClick: () => {
        }
    })
    cancel_button.classList.add('modal__cancel-button')
    cancel_button.onclick = () => closeModal()

    // Options Wrapper
    const options = document.createElement('div')
    options.classList.add('modal__options')

// Tag Options
    const tag_form = document.createElement('form')
    tag_form.classList.add('modal__tag-list')

    // Home Tag
    const home_label = document.createElement('label')

    const home_tag = document.createElement('input')
    home_tag.type = 'radio'
    home_tag.name = 'tag'
    home_tag.value = 'home'

    const home_div = document.createElement('div')
    home_div.classList.add('task-tag', "task-tag--green", 'modal__tag')
    home_div.innerText = 'home'

    home_label.append(home_tag, home_div)

    // Health Tag
    const health_label = document.createElement('label')

    const health_tag = document.createElement('input')
    health_tag.type = 'radio'
    health_tag.name = 'tag'
    health_tag.value = 'health'

    const health_div = document.createElement('div')
    health_div.classList.add('task-tag', "task-tag--blue", 'modal__tag')
    health_div.innerText = 'health'

    health_label.append(health_tag, health_div)

    // Work Tag
    const work_label = document.createElement('label')

    const work_tag = document.createElement('input')
    work_tag.type = 'radio'
    work_tag.name = 'tag'
    work_tag.value = 'work'

    const work_div = document.createElement('div')
    work_div.classList.add('task-tag', "task-tag--purple", 'modal__tag')
    work_div.innerText = 'work'

    work_label.append(work_tag, work_div)

    // Other Tag
    const other_label = document.createElement('label')

    const other_tag = document.createElement('input')
    other_tag.type = 'radio'
    other_tag.name = 'tag'
    other_tag.value = 'other'
    other_tag.defaultChecked = true

    const other_div = document.createElement('div')
    other_div.classList.add('task-tag', "task-tag--orange", 'modal__tag')
    other_div.innerText = 'other'

    other_label.append(other_tag, other_div)

    // Appending Form
    tag_form.append(health_label, work_label, home_label, other_label)

    // Date Input
    const date_input = document.createElement('input')
    date_input.type = 'date'
    date_input.classList.add('modal__date')
    date_input.id = 'date-input'
    date_input.valueAsDate = new Date();

    options.append(tag_form, date_input)

    // Button Wrapper
    const button_wrapper = document.createElement('div')
    button_wrapper.classList.add('modal__buttons')

    button_wrapper.append(cancel_button, add_button)

    modal.append(modal_title, modal_input, options, button_wrapper)
    overlay.append(modal)

    return overlay
}

export default Modal