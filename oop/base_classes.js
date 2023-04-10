class Component {
    constructor() {
        this.state = {};
        this.props = {};
        this.element = document.createElement('div');
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.update();
    }

    /**
     *
     * @param props
     * @returns {HTMLElement}
     */
    render(props = {}) {
        this.props = {...props};

        const component = this.element;
        component.onclick = props.onClick;

        if (props.style) {
            component.style = props.style;
        }

        if (props.className) {
            component.classList.add(...props.className)
        }

        if (props.id) {
            component.id = props.id
        }

        component.innerHTML = '';

        if (props.children && Array.isArray(props.children)){
            component.append(...props.children)
        } else if (props.children){
            component.append(props.children)
        }

        return component;
    }

    update() {
        this.render(this.props);
    }
}
