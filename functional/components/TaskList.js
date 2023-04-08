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
    const list_wrapper = document.createElement('div')
    list_wrapper.classList.add('list-wrapper')

    // Title
    const list_title = document.createElement('div')
    list_title.classList.add('list-wrapper__title')
    list_title.innerText = title

    // Items - array of li
    const listItems = items.map((item) => {
        const li = document.createElement('li')
        li.append(TaskItem(item, deleteItem, checkItem))
        return li
    });

    // Items - ul
    const ul_wrapper = document.createElement('div')
    ul_wrapper.classList.add('list-wrapper__items')

    const ul = document.createElement("ul");

    // Appending
    ul.append(...listItems);
    ul_wrapper.append(ul)
    list_wrapper.append(list_title, ul_wrapper)

    return list_wrapper;
}

export default TaskList