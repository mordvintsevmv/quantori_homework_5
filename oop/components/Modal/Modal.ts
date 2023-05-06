import {Component, ComponentProps} from "../../base_classes";
import "./Modal.scss"

interface ModalProps extends ComponentProps {
    closeModal: () => void,
    modal_children: HTMLElement
}


class Modal extends Component {

    element: HTMLDivElement

    constructor() {
        super();
        this.element = document.createElement("div")
    }

    render(props: ModalProps): HTMLDivElement {

        const modal: HTMLDivElement = document.createElement('div')
        modal.classList.add('modal')
        modal.onclick = (event: MouseEvent): void => {
            event.stopPropagation()
        }
        modal.append(props.modal_children)

        return super.render({
            onClick: props.closeModal,
            children: [modal],
            className: ['overlay']
        }) as HTMLDivElement;
    }
}

export default Modal