import {Component, ComponentProps} from "../../base_classes";
import "./Input.scss"

interface InputProps extends ComponentProps{
    placeholder: string,
}

interface InputState {
    value: string,
    placeholder: string
}
class Input extends Component {

    state: InputState
    props: InputProps;
    element: HTMLInputElement

    constructor() {
        super();
        this.state = {value: '', placeholder: ''}
        this.element = document.createElement('input');
    }

    render(props: InputProps): HTMLInputElement {

        if (this.state.placeholder === '' && props.placeholder){
            this.setState({...this.state, placeholder: props.placeholder})
        }

        this.element.placeholder = this.state.placeholder
        this.element.value = this.state.value

        this.element.oninput = (event: KeyboardEvent): void => {
            event.preventDefault()
            const input: HTMLInputElement = event.target as HTMLInputElement
            this.setState({...this.state, value: input.value})
        }

        return super.render({
            className: ['text-input'],
            id: props.id,
        }) as HTMLInputElement;
    }
}

export default Input