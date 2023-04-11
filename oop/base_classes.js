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
    render(props) {
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

        if (props.children) {

            if (props.children.length > component.children.length) {
                for (let i = 0; i < props.children.length; i++) {
                    if (i < component.children.length) {
                        if (!component.children[i].isEqualNode(props.children[i])) {
                            component.children[i].replaceWith(props.children[i])
                        }
                    } else {
                        component.append(props.children[i])
                    }

                }
            } else if (props.children.length < component.children.length) {
                for (let i = 0; i < component.children.length; i++) {
                    if (i < props.children.length) {
                        if (!component.children[i].isEqualNode(props.children[i])) {
                            component.children[i].replaceWith(props.children[i])
                        }
                    } else {
                        component.children[i].remove()
                    }

                }
            } else {
                for (let i = 0; i < props.children.length; i++) {
                    if (!component.children[i].isEqualNode(props.children[i])) {
                        component.children[i].replaceWith(props.children[i])
                    }
                }
            }
        }

        if (component.innerHTML === '') {
            if (props.children && Array.isArray(props.children)) {
                component.append(...props.children)
            } else if (props.children) {
                component.append(props.children)
            }
        }

        return component;
    }

    update() {
        this.render(this.props);
    }
}
