import {Component, ComponentProps} from "../../base_classes";
import "./CustomCheckInput.scss"

interface CustomCheckInputProps extends ComponentProps {
    type: string,
    name: string,
    value: string,
    outline: string,
    isDefault: boolean,
    input_element: HTMLElement
}

class CustomCheckInput extends Component {

    element: HTMLLabelElement

    constructor() {
        super();
        this.element = document.createElement('label');
    }


    render(props: CustomCheckInputProps): HTMLLabelElement {

        const input: HTMLInputElement = document.createElement('input')
        input.name = props.name
        input.value = props.value
        input.type = ['checkbox', 'radio'].includes(props.type) ? props.type : 'radio'
        input.defaultChecked = props.isDefault
        input.classList.add('custom-check-input__input')

        const input_element: HTMLElement = props.input_element
        input_element.classList.add('custom-check-input__children')

        this.element.style.borderColor = props.outline

        return super.render({
            children: [input, input_element],
            className: ['custom-check-input']
        }) as HTMLLabelElement;
    }
}

export default CustomCheckInput