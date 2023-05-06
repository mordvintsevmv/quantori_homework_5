import {Component, ComponentProps} from "../../base_classes";
import "./TaskTag.scss"

interface TaskTagProps extends ComponentProps {
    name: string,
    isColored: boolean
}

class TaskTag extends Component {

    element: HTMLDivElement

    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: TaskTagProps): HTMLDivElement {

        let tag_color: string = ''

        if (props.isColored) {
            switch (props.name) {
                case 'home':
                    tag_color = ("task-tag--green")
                    break;
                case 'health':
                    tag_color = ("task-tag--blue")
                    break;
                case 'work':
                    tag_color = ("task-tag--purple")
                    break;
                case 'other':
                default:
                    tag_color = ("task-tag--orange")
                    break;
            }
        }

        this.element.innerText = props.name

        return super.render({
            className: props.isColored ? ['task-tag', tag_color] : ['task-tag']
        }) as HTMLDivElement;
    }
}

export default TaskTag