import Button from "./Button.js";

export const TodayTasks = ({closeModal, setTodayShown, items}) => {

    //Wrapper
    const today_wrapper = document.createElement('div')
    today_wrapper.classList.add('today-tasks')

    // Creating text for date
    const today = new Date();

    // Title
    const today_title = document.createElement('h2')
    today_title.innerText = 'Good Morning'
    today_title.classList.add('today-tasks__title')

    // Task for today
    const today_task_wrapper = document.createElement('div')
    today_task_wrapper.classList.add('today-tasks__list')

    const today_ul = document.createElement('ul')

    let today_list = items.filter(task => {
        const parsed_date = new Date(Date.parse(task.date))

        if (parsed_date.getFullYear() === today.getFullYear()
            && parsed_date.getMonth() === today.getMonth()
            && parsed_date.getDate() === today.getDate()
        ) {
            return true
        }
    })

    today_list = today_list.map(task => {
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

    if (today_list.length === 0){
        today_text.innerText = 'You have no tasks for today! '
    } else{
        today_text.innerText = 'You have the next planned tasks for today: '
    }

    const today_ok = Button({text: 'Ok', onClick: () => {setTodayShown(); closeModal() }})
    today_ok.classList.add('today-tasks__ok-button')

    today_wrapper.append(today_title, today_text, today_task_wrapper, today_ok)

    return today_wrapper
}