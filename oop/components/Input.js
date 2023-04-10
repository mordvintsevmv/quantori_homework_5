class Input extends Component {
    constructor() {
        super();
        this.element = document.createElement('input');
    }

    /**
     * @override
     * @param props
     * @param props.placeholder {string}
     * @returns {HTMLInputElement} - Input element
     * */
    render(props) {

        this.element.placeholder = props.placeholder

        return super.render({
            children: props.placeholder,
            style: this.state.style,
            className: ['text-input']
        });
    }
}