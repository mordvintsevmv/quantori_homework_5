import TaskItem from "./TaskItem.js";

/**
 * Functional component for the list
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
    list_title.classList.add('list_wrapper__title')
    list_title.innerText = title

    // Items - array of li
    const listItems = items.map((item) => {
        const li = document.createElement('li')
        li.append(TaskItem(item, deleteItem, checkItem))
        return li
    });

    // Items - ul
    const ul = document.createElement("ul");
    ul.classList.add('list_wrapper__items')

    // Appending
    ul.append(...listItems);
    list_wrapper.append(list_title, ul)

    return list_wrapper;
}

export default TaskList