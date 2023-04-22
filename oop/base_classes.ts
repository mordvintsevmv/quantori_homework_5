export interface ComponentProps {
    onClick?: (e: MouseEvent) => void,
    className?: string[],
    id?: string,
    children?: HTMLElement[]
}

export class Component {

    state: Object
    props: ComponentProps
    element: HTMLElement

    constructor() {
        this.state = {};
        this.props = {};
        this.element = document.createElement('div');
        this.ComponentDidCreate()
    }

    setState(state: Object): void {
        this.state = {...this.state, ...state};
        this.ComponentDidUpdate();
    }

    ComponentDidCreate(): void {
    }

    ComponentDidUpdate(): void {
        this.render(this.props);
    }

    render(props: ComponentProps): HTMLElement {
        this.props = {...props};

        const component: HTMLElement = this.element;

        if (props.onClick) {
            component.onclick = props.onClick;
        }

        if (props.className) {
            component.classList.add(...props.className)
        }

        if (props.id) {
            component.id = props.id
        }

        if (props.children && component.children.length > 0) {

            // If there are more incoming components than the initial ones
            // (for example, a modal window has opened),
            // then it is necessary to insert them without checking at the end.
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
            }

                // If the incoming components are smaller than the original ones
                // (for example, the modal window has closed),
            // then it is necessary to remove the latter
            else if (props.children.length < component.children.length) {
                for (let i = 0; i < component.children.length; i++) {
                    if (i < props.children.length) {
                        if (!component.children[i].isEqualNode(props.children[i])) {
                            component.children[i].replaceWith(props.children[i])
                        }
                    } else {
                        component.children[i].remove()
                    }

                }
            }

                // If the number of components is the same,
            // then it is necessary to compare them with each other
            else {
                for (let i = 0; i < props.children.length; i++) {
                    if (!component.children[i].isEqualNode(props.children[i])) {
                        console.log("OLD:", component.children[i])
                        console.log("NEW:", props.children[i])
                        component.children[i].replaceWith(props.children[i])
                    }
                }
            }
        }

        // First render of App - empty component
        if (component.innerHTML === '') {
            component.append(...props.children)
        }

        return component;
    }
}
