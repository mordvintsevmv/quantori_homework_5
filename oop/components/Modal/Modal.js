import {Component} from "../../base_classes.js";
import "./Modal.scss"

class Modal extends Component {
    constructor() {
        super();
    }

    /**
     * @override
     * @param props
     * @param props.closeModal {function}
     * @param props.children {HTMLElement}
     * @returns {HTMLDivElement} - Modal element
     * */
    render(props) {

        const modal = document.createElement('div')
        modal.classList.add('modal')
        modal.onclick = (event) => {
            event.stopPropagation()
        }
        modal.append(props.children)

        return super.render({
            onClick: props.closeModal,
            children: modal,
            style: this.state.style,
            className: ['overlay']
        });
    }
}

export default Modal