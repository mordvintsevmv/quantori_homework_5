class Button extends Component {
    constructor() {
        super();
        this.element = document.createElement('button');
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.isTransparent {boolean}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {
        return super.render({
            onClick: props.onClick,
            children: props.text,
            style: this.state.style,
            className: ['button']
        });
    }
}