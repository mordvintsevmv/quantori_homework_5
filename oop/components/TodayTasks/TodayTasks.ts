import {Component, ComponentProps} from "../../base_classes";
import Button from "../Button/Button";
import "./TodayTasks.scss"
import {Item} from "../../types/item";

interface TodayTasksProps extends ComponentProps {
    setTodayShown: () => void,
    closeModal: () => void,
    items: Item[]
}

class TodayTasks extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: TodayTasksProps) {

        const today = new Date();

        // Title
        const today_title = document.createElement('h2')
        today_title.innerText = 'Good Morning'
        today_title.classList.add('today-tasks__title')

        // Task for today
        const today_task_wrapper = document.createElement('div')
        today_task_wrapper.classList.add('today-tasks__list')

        const today_ul = document.createElement('ul')

        const today_list = props.items
            // Filtering Today Tasks
            .filter(task => {
                const parsed_date = new Date(Date.parse(task.date))

                if (parsed_date.getFullYear() === today.getFullYear()
                    && parsed_date.getMonth() === today.getMonth()
                    && parsed_date.getDate() === today.getDate()
                    && !task.isChecked
                ) {
                    return true
                }
            })
            // Creating li element for every today task
            .map(task => {
                const li = document.createElement('li')
                li.innerText = task.title
                li.classList.add('today-tasks__task')
                return li
            })


        today_ul.append(...today_list)
        today_task_wrapper.append(today_ul)


        // Text
        const today_text = document.createElement('p')
        today_text.classList.add('today-tasks__text')

        if (today_list.length === 0) {
            today_text.innerText = 'You have no tasks for today! '
        } else {
            today_text.innerText = 'You have the next planned tasks for today: '
        }

        // OK Button
        const today_ok = new Button().render({
            text: 'Ok',
            onClick: () => {
                props.setTodayShown();
                props.closeModal()
            }
        })
        today_ok.classList.add('today-tasks__ok-button')

        return super.render({
            onClick: props.onClick,
            children: [today_title, today_text, today_task_wrapper, today_ok],
            className: ['today-tasks']
        });
    }
}

export default TodayTasks