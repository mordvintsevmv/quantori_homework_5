import {Component, ComponentProps} from "../../base_classes";
import "./CustomCheckInput.scss"

interface CustomCheckInputProps extends ComponentProps{
    type: string,
    name: string,
    value: string,
    outline: string,
    isDefault: boolean,
    input_div: HTMLElement
}

class CustomCheckInput extends Component {
    constructor() {
        super();
        this.element = document.createElement('label');
    }


    render(props: CustomCheckInputProps) {

        const input = document.createElement('input')
        input.name = props.name
        input.value = props.value
        input.type = ['checkbox', 'radio'].includes(props.type) ? props.type : 'radio'
        input.defaultChecked = props.isDefault
        input.classList.add('custom-check-input__input')

        const div = props.input_div
        div.classList.add('custom-check-input__children')

        this.element.style.borderColor = props.outline

        return super.render({
            children: [input, div],
            className: ['custom-check-input']
        });
    }
}

export default CustomCheckInput