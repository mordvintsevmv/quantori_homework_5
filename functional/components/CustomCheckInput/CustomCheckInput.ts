import "./CustomCheckInput.css"

interface CustomCheckInputProps {
    type?: string,
    name: string,
    value: string,
    outline: string,
    isDefault?: boolean,
    input_element: HTMLElement
}

const CustomCheckInput = ({
                              type = 'radio',
                              name,
                              value,
                              outline,
                              isDefault = false,
                              input_element
                          }: CustomCheckInputProps): HTMLLabelElement => {

    const label: HTMLLabelElement = document.createElement('label')
    label.classList.add('custom-check-input')
    label.style.borderColor = outline

    const input: HTMLInputElement = document.createElement('input')
    input.name = name
    input.value = value
    input.type = ['checkbox', 'radio'].includes(type) ? type : 'radio'
    input.defaultChecked = isDefault
    input.classList.add('custom-check-input__input')

    const element: HTMLElement = input_element
    element.classList.add('custom-check-input__children')

    label.append(input, element)

    return label
}

export default CustomCheckInput