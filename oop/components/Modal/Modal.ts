import {Component, ComponentProps} from "../../base_classes";
import "./Modal.scss"

interface ModalProps extends ComponentProps{
    closeModal: ()=>void,
    modal_children: HTMLElement
}


class Modal extends Component {
    constructor() {
        super();
    }

    render(props: ModalProps) {

        const modal = document.createElement('div')
        modal.classList.add('modal')
        modal.onclick = (event) => {
            event.stopPropagation()
        }
        modal.append(props.modal_children)

        return super.render({
            onClick: props.closeModal,
            children: [modal],
            className: ['overlay']
        });
    }
}

export default Modal