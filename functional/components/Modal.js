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
    const add_button = Button({text: 'Add Task', onClick: ()=>{}})
    add_button.classList.add('modal__add-button')
    add_button.onclick = () => {addTask()}

    // Cancel Button
    const cancel_button = Button({text: 'Cancel', isTransparent: true, onClick: ()=>{}})
    cancel_button.classList.add('modal__cancel-button')
    cancel_button.onclick = () => closeModal()


    // Button Wrapper
    const button_wrapper = document.createElement('div')
    button_wrapper.classList.add('modal__buttons')

    button_wrapper.append(cancel_button, add_button)

    modal.append(modal_title, modal_input, button_wrapper)
    overlay.append(modal)

    return overlay
}

export default Modal