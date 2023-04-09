import TaskItem from "./TaskItem.js";

/**
 * Functional component for the Task List
 * @param title {string}
 * @param items {Object[]}
 * @param deleteItem {function}
 * @param checkItem {function}
 * @returns {HTMLElement} - List element
 */
const TaskList = ({title, items, deleteItem, checkItem}) => {

    // Wrapper
    const list = document.createElement('div')
    list.classList.add('task-list')

    // Title
    const list_title = document.createElement('h2')
    list_title.classList.add('task-list__title')
    list_title.innerText = title

    // Items - array of li
    const list_items = items.map((item) => {
        const li = document.createElement('li')
        li.append(TaskItem(item, deleteItem, checkItem))
        return li
    });

    // Items - ul
    const ul_wrapper = document.createElement('div')
    ul_wrapper.classList.add('task-list__items')
    const ul = document.createElement("ul");

    // Appending
    ul.append(...list_items);
    ul_wrapper.append(ul)
    list.append(list_title, ul_wrapper)

    return list;
}

export default TaskList