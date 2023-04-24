import TaskItem from "../TaskItem/TaskItem";

import "./TaskList.css"
import {Item} from "../../types/Item";

interface TaskListProps {
    title: string,
    items: Item[],
    deleteItem: (id: number) => void,
    checkItem: (id: number) => void,
}

const TaskList = ({title, items, deleteItem, checkItem}: TaskListProps): HTMLDivElement => {

    // Wrapper
    const list: HTMLDivElement = document.createElement('div')
    list.classList.add('task-list')

    // Title
    const list_title: HTMLHeadingElement = document.createElement('h2')
    list_title.classList.add('task-list__title')
    list_title.innerText = title

    // Items - array of li
    const list_items: HTMLLIElement[] = items
        .map((item: Item): HTMLLIElement => {
            const li: HTMLLIElement = document.createElement('li')
            li.append(TaskItem({item, deleteItem, checkItem}))
            return li
        });

    // Items - ul
    const ul_wrapper: HTMLDivElement = document.createElement('div')
    ul_wrapper.classList.add('task-list__items')
    const ul: HTMLUListElement = document.createElement("ul");

    // Appending
    ul.append(...list_items);
    ul_wrapper.append(ul)
    list.append(list_title, ul_wrapper)

    return list;
}

export default TaskList