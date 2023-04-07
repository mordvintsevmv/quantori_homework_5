/**
 * Button component
 * @param text {string}
 * @param isTransparent {boolean}
 * @param onClick {function}
 * @returns {HTMLButtonElement} - Button element
 */
const Button = ({text, isTransparent = false, onClick}) => {

    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    button.classList.add('button')

    if (isTransparent){
        button.classList.add('button--isTransparent')
    }

    return button;
}

export default Button