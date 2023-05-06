import {Component, ComponentProps} from "../../base_classes";
import "./Button.scss"

interface ButtonProps extends ComponentProps {
    text: string,
    isTransparent?: boolean,
}

class Button extends Component {

    element: HTMLButtonElement

    constructor() {
        super();
        this.element = document.createElement('button');
    }

    render(props: ButtonProps): HTMLButtonElement {

        this.element.innerText = props.text

        return super.render({
            onClick: props.onClick,
            className: props.isTransparent ? ['button', 'button--isTransparent'] : ['button']
        }) as HTMLButtonElement;
    }
}

export default Button