class TaskTag extends Component {
    constructor() {
        super();
    }

    /**
     * @override
     * @param props
     * @param props.name {string}
     * @param props.isColored {boolean}
     * @returns {HTMLDivElement} - HTML code for TaskTag element
     * */
    render(props) {

        let tag_color = ''

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

        return super.render({
            children: props.name,
            className: props.isColored ? ['task-tag', tag_color] : ['task-tag']
        });
    }
}