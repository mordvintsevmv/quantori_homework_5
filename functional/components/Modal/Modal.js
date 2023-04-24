import "./Modal.css"

const Modal = ({closeModal, children}) => {

    // Overlay
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    overlay.onclick = () => {
        closeModal()
    }

    // Modal wrapper
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.onclick = (event) => {
        event.stopPropagation()
    }

    modal.append(children)
    overlay.append(modal)

    return overlay
}

export default Modal