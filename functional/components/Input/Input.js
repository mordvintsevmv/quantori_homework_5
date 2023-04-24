import "./Input.css"

const Input = ({placeholder = "Sample Text"}) => {

    // Search input
    const input = document.createElement('input')
    input.classList.add('text-input');
    input.placeholder = placeholder

    return input
}

export default Input