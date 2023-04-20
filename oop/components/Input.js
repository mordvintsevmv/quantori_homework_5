import {Component} from "../base_classes.js";

class Input extends Component {
    constructor() {
        super();
        this.state = {value: ''}
        this.element = document.createElement('input');
        this.element.placeholder = this.props.placeholder
    }

    /**
     * @override
     * @param props
     * @param props.placeholder {string}
     * @param props.id {string}
     * @returns {HTMLInputElement} - Input element
     * */
    render(props) {

        this.element.placeholder = props.placeholder || this.props.placeholder
        this.element.value = this.state.value

        this.element.oninput = (event) => {
            event.preventDefault()
            this.setState({value: event.target.value})
        }

        return super.render({
            style: this.state.style,
            className: ['text-input'],
            id: props.id,
            placeholder: props.placeholder
        });
    }
}

export default Input