/**
 * Text Input component
 * @param placeholder {string}
 * @returns {HTMLInputElement} - Input element
 */
const Input = ({placeholder}) => {

    // Search input
    const search_field = document.createElement('input')
    search_field.classList.add('text-input');
    search_field.placeholder = placeholder

    return search_field
}

export default Input