class CustomCheckInput extends Component {
    constructor() {
        super();
        this.element = document.createElement('label');
    }

    /**
     * @override
     * @param props
     * @param props.type {string}
     * @param props.name {string}
     * @param props.value {string}
     * @param props.outline {string}
     * @param props.isDefault {boolean}
     * @param props.children {HTMLElement}
     * @returns {HTMLLabelElement} - Label with Radio or Checkbox Element
     * */
    render(props) {

        const input = document.createElement('input')
        input.name = props.name
        input.value = props.value
        input.type = ['checkbox', 'radio'].includes(props.type) ? props.type : 'radio'
        input.defaultChecked = props.isDefault
        input.classList.add('custom-check-input__input')

        const div = props.children
        div.classList.add('custom-check-input__children')

        this.element.style.borderColor = props.outline

        return super.render({
            children: [input, div],
            style: this.state.style,
            className: ['custom-check-input']
        });
    }
}