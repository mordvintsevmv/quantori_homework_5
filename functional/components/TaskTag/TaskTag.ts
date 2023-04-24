import "./TaskTag.css"

interface TaskTagProps {
    name: string,
    isColored?: boolean
}

const TaskTag = ({name, isColored = true}: TaskTagProps): HTMLDivElement => {

    const tag_div: HTMLDivElement = document.createElement('div')
    tag_div.classList.add('task-tag')

    if (isColored) {
        switch (name) {
            case 'home':
                tag_div.classList.add("task-tag--green")
                break;
            case 'health':
                tag_div.classList.add("task-tag--blue")
                break;
            case 'work':
                tag_div.classList.add("task-tag--purple")
                break;
            case 'other':
            default:
                tag_div.classList.add("task-tag--orange")
                break;
        }
    }

    tag_div.innerText = name

    return tag_div
}

export default TaskTag