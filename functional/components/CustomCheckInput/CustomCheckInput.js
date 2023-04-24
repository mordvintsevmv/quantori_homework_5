import "./CustomCheckInput.css"

const CustomCheckInput = ({type = 'radio', name, value, outline, isDefault = false, children}) => {

    const label = document.createElement('label')
    label.classList.add('custom-check-input')
    label.style.borderColor = outline

    const input = document.createElement('input')
    input.name = name
    input.value = value
    input.type = ['checkbox', 'radio'].includes(type) ? type : 'radio'
    input.defaultChecked = isDefault
    input.classList.add('custom-check-input__input')

    const div = children
    div.classList.add('custom-check-input__children')

    label.append(input, div)

    return label
}

export default CustomCheckInput
