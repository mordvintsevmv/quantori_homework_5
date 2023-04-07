/**
 * Button component
 * @param text {string}
 * @param onClick {function}
 * @returns {HTMLButtonElement} - Button element
 */
const Button = ({text, onClick}) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    button.classList.add('button')

    return button;
}

export default Button