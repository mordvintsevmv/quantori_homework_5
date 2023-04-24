import "./Modal.css"

interface ModalProps {
    closeModal: () => void,
    modal_children: HTMLElement
}

const Modal = ({closeModal, modal_children}: ModalProps): HTMLDivElement => {

    // Overlay
    const overlay: HTMLDivElement = document.createElement('div')
    overlay.classList.add('overlay')
    overlay.onclick = (): void => {
        closeModal()
    }

    // Modal wrapper
    const modal: HTMLDivElement = document.createElement('div')
    modal.classList.add('modal')
    modal.onclick = (event: MouseEvent): void => {
        event.stopPropagation()
    }

    modal.append(modal_children)
    overlay.append(modal)

    return overlay
}

export default Modal