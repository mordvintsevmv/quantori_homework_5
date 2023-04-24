import "./Input.css"

interface InputProps {
    placeholder: string,
}

const Input = ({placeholder = "Sample Text"}: InputProps): HTMLInputElement => {

    // Search input
    const input: HTMLInputElement = document.createElement('input')
    input.classList.add('text-input');
    input.placeholder = placeholder

    return input
}

export default Input