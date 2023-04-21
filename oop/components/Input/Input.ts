import {Component, ComponentProps} from "../../base_classes";
import "./Input.scss"

interface InputProps extends ComponentProps{
    placeholder: string,
}

interface InputState {
    value: string
}
class Input extends Component {

    state: InputState
    element: HTMLInputElement
    props: InputProps;

    constructor() {
        super();
        this.state = {value: ''}
        this.element = document.createElement('input');
        this.element.placeholder = this.props.placeholder
    }

    render(props: InputProps) {

        this.element.placeholder = props.placeholder || this.props.placeholder
        this.element.value = this.state.value

        this.element.oninput = (event) => {
            event.preventDefault()
            const input = event.target as HTMLInputElement
            this.setState({value: input.value})
        }

        return super.render({
            className: ['text-input'],
            id: props.id,
        });
    }
}

export default Input