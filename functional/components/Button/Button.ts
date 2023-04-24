import "./Button.css"

interface ButtonProps {
    text: string,
    isTransparent?: boolean,
    onClick: () => void
}

const Button = ({text, isTransparent = false, onClick}: ButtonProps): HTMLButtonElement => {

    const button: HTMLButtonElement = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    button.classList.add('button')

    if (isTransparent) {
        button.classList.add('button--isTransparent')
    }

    return button;
}

export default Button