import "./TaskTag.css"

const TaskTag = ({name, isColored = true}) => {
    const tag_div = document.createElement('div')
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