# Quantori Homework #5-6

---

### Homework 5

### Git, DOM, OOP

### Developed:

- [X] ToDo List with Functional Components
- [X] ToDo List with Class Components
- [X] Responsive design for all versions
- [X] Saving Task Items to the localStorage
- [X] Class Components saves state of children components

**Main Branch:** <a href="https://mordvintsevmv.github.io/quantori_homework_5" target="_blank">Open page</a>

**Description:** *The main branch of the app.*

---

**Functional ToDo Branch:** <a href="https://quantori-hw5-feature-functional.netlify.app/" target="_blank">Open page</a>

**Description:** *ToDo List using Functional Components.*

---

**Functional FLUX ToDo Branch:** <a href="https://quantori-hw5-feature-functional-flux.netlify.app/" target="_blank">Open page</a>

**Description:** *ToDo List using Functional Components with FLUX principle.*

---

**OOP ToDo Branch:** <a href="https://quantori-hw5-feature-oop.netlify.app/" target="_blank">Open page</a>

**Description:** *ToDo List using Class Components.*

---

### Homework 6

### Promises, Event Loop

### Developed:

- [X] Weather Widget
- [X] Fetching Data from

**(HW6) OOP ToDo Branch:** <a href="https://quantori-hw6-feature-oop.netlify.app/" target="_blank">Open page</a>

**Description:** *ToDo List using Class Components.*

---

**(HW6) Functional ToDo Branch:** <a href="https://quantori-hw6-feature-functional.netlify.app/" target="_blank">Open page</a>

**Description:** *ToDo List using Functional Components.*

---

**The application was tested on a variety of devices (iOS, MacOS, Windows, Android) and browsers (Safari, Chrome, Firefox) manually.**

**More information about the components and solutions is provided in the documentation.**

---

## <a name="content">Content</a>

1. [Task](#Task)
2. [Project Structure](#structure)
3. [Technical Solutions](#solutions)
   1. [Task Object](#solutions-taskobject)
   1. [State and localStorage](#solutions-storage)
   1. [Search Task](#solutions-search)
   1. [Save state of children components (OOP)](#solutions-oop-state)
   2. [Responsive Design](#solutions-responsive)
4. [Components](#components)
5. [Contacts](#contacts)

---

## <a name="Task">Task</a>

## Basic requirements

### Implementation

Use either boilerplate from functional.js or components.js files.

You can update base classes as needed, but you must not use any frameworks or libraries, just plain JS.

### General layout

- App should have a header
- App should have a search field
- Next to the search field there should be a button to add a new task
- In the content section, there should be a list of all unfinished tasks
- Under the list of unfinished tasks, there should be a list of all finished tasks

### Scenario 1: Adding a new task

When the user clicks on the "Add task" button, a modal window should appear.
The modal window should have the following fields:
- Title
- Input field for the task title
- Cancel button
- Add button

When the user clicks on the "Add" button, the modal window should close and the task should be added to the list of unfinished tasks.

When the user clicks on the "Cancel" button, the modal window should close. No changes should be made to the task list.

### Scenario 2: Marking a task as finished

When the user sees an unfinished task in the list, they should be able to mark it as finished by clicking on the checkbox next to the task title.

When the user clicks on the checkbox, the task should be moved to the list of finished tasks.

### Scenario 3: Deleting a task

When the user sees a task in the list, they should be able to delete it by clicking on the "Delete" button next to the task title.

When the user clicks on the "Delete" button, the task should be removed from the list.

### Scenario 4: Searching for a task

When the user types a search query into the search field, the list of unfinished tasks should be filtered by the search query.

Tasks are updated in real time as the user types the search query.


These are basic requirements and are worth 1 point. If they are not met, the homework will be rejected.

## UI improvements - 2 points

Make the app look like the mockups.

Please use only vanilla CSS. No CSS frameworks are allowed.

# Possible extensions

## Local storage - 2 points

Make app persistent.

Store the tasks in the local storage. When the user reloads the page, the tasks should be loaded from the local storage.

## Implement logic using both OOP and FP - 2 points

There are 2 examples on how to approach the app logic: functional and object-oriented.

If you implement logic using both approaches, you will get 2 points.

## Don't lose children's state on parent's rerender - 2 points

Current implementation of the class-based components lose state for their children.

I.e. if you have an input inside a list, and list rerenders, text in input will be lost.

Make a solution that will preserve state of children components.

---

## <a name="structure">Project Structure</a>

```
quantori_homework_5
│   README.md
│   404.html    
│   index.html    
│   og_image.png
│   .gitignore
│
└─── css - folder for all components style
│   │   Modal.css
│   │   Input.css
│   └─  ...
│   
└─── favicon - Favicons
│   │   favicon.ico
│   └─  ...
│
└─── functional - folder for all files of the Functional Components 
│   │   components - folder for all Components
│   └─  functional.js - all base functions for Functional Components
│
└─── oop - folder for all files of the Class Components
│   │   components - folder for all Components
│   └─  base_classes.js - base class for Class Components
│
└─── img - Images folder
│   │   checkbox-checked.svg
│   │   delete-new-value.svg
└   └─  ...
```

---

## <a name="solutions">Technical Solutions</a>

All the tasks were completed:
- [X] All the necessary functionality has been implemented;
- [X] The layout is made according to the Figma mockup
- [X] All Tasks stored in localStorage and loaded on page rendering
- [X] Both Functional and OOP Component were created
- [X] Class Components saves state of children components

---

### <a name="solutions-taskobject">Task Object</a>

Before starting development, it was necessary to define the structure of the TaskItem object.

Example of an object:

```javascript
const item = {
    id: 0, // Unique ID
    isChecked: true, 
    title: 'Complete Homework #5', 
    tag: 'work', 
    date: new Date()
}
```
---

### <a name="solutions-storage">State and localStorage</a>

#### Functional 

In this approach, it was decided to use the global state object, 
which is defined when the application is first launched:

```javascript
let state = {
    items: task_items,
    last_id: task_items.reduce((max, item) => max > item.id ? max : item.id, task_items[0].id),
    isModal: false
}
```
*functional.js*


The **last_id** parameter is calculated by the maximum id of existing objects, 
so that Items do not have the same id.

The **isModal** parameter is used to determine whether the modal window is currently open.

It was also decided not to load items from localStorage at each rendering of the App Component, 
but to load them at the first launch (or use sample items if no data in localStorage):

```javascript
const task_items = load_items() || [
    {id: 0, isChecked: true, title: 'Complete Homework #5', tag: 'work', date: new Date()},
]
```
*functional.js*

All items are saved whenever the global state changes:

```javascript
export const useState = (initialValue = undefined) => {

    function setValue(newValue) {
        state = newValue;
        save_items(); // saving items in localStorage
        renderApp();
    }
}
```
*functional.js*

When rendering an App Component we get a global **state** and a function **setState** to change it using the useState() function.

```javascript
const App = () => {

    const [state, setState] = useState()
}
```
*App.js*

**Therefore:**
- When the application is first launched, a global state object is created with tasks from localStorage or sample tasks;
- All tasks are saved to localStorage every time the global state changes;
- The global state stores tasks, the state of the modal window, and other data (in different versions).

#### OOP

Everything is the same, except that the class approach allowed implement a state for each object. 
Therefore, the tasks are stored in the state of the App component and not in global state.

```javascript
class App extends Component {
    constructor() {
        super();
        this.state = {
            items: task_items,
            last_id: task_items.reduce((max, item) => max > item.id ? max : item.id, task_items[0].id),
            isModal: false,
            search_input: ''
        }
    }
}
```
*App.js*

It also allowed, for example, to store data about the Input value in the state of the Input component, what will be useful in the future when optimizing the application:

```javascript
class Input extends Component {
    constructor() {
        super();
        this.state = {value: ''}
    }
}
```
*Input.js*

---

### <a name="solutions-search">Search Task</a>

Since every time the state changes, all the App components (and its children) are rendered, 
it was decided to perform the search not by changing all the global state on every input, but by replacing only the TaskList element by ID on every input.

Therefore, when we press a key, function create a new list of tasks that correspond to the query string 
(excluding spaces and case) and replaces the already rendered TaskList component with a similar one, but with filtered tasks:

```javascript
        input.onkeyup = event => {
            const in_work_items = this.state.items.filter(item => (item.isChecked === false) && (item.title.toLowerCase().replace(/\s+/g, '').includes(event.target?.value.toLowerCase().replace(/\s+/g, '') || '')))
            const in_work_task_list = new TaskList().render({
                items: in_work_items,
                title: 'All Tasks',
                deleteItem: this.deleteItem,
                checkItem: this.checkItem,
                id: 'in-work-tasks'
            })
            in_work_task_list.id = 'in-work-tasks'

            document.getElementById('in-work-tasks').replaceWith(in_work_task_list)
        }
```
*App.js*

This approach works effectively, does not force the entire application to be rendered again, and also does not cause problems with the focus on input.

However, this approach is not entirely correct from the point of view of how the application works in my mind. Therefore, it was decided to make this feature with FLUX architecture in the branch **feature/functional-todo-flux**.

Each time user input something in Input Component, it does not change its value, but saves it to state. 
After that, the value will get to Input from the state after rerendering App.

```javascript
    search.value = state.search_input
    search.oninput = event =>{
        event.preventDefault();
        setState({...state, search_input: event.target.value})
    }
```
*App.js*

This way we can get the value of the search query from the global state and render the necessary tasks, rather than replacing them "manually".
```javascript
    const in_work_items = state.items.filter(item => (item.isChecked === false && item.title.toLowerCase().includes(state.search_input.toLowerCase().replace(/\s/g, ''))))
```
*App.js*

Since the App changes its state (and renders) every time the key is pressed, the focus on Input is lost every time. To solve this problem, it was necessary to change the state and implement additional checks for active Input:

```javascript
let state = {
    items: task_items,
    last_id: task_items.reduce((max, item) => max > item.id ? max : item.id, task_items[0].id),
    isModal: false,
    add_task_input: '',
    add_task_focus: false,
    search_input: '',
    search_focus: false
}

function renderApp() {
   root.addEventListener('click', ()=>{
      state.search_focus = false
      state.add_task_focus = false
   })
   search.addEventListener('click', (event)=>{
      event.stopPropagation()
      state.search_focus = true
   })
   add.addEventListener('click', (event)=>{
      event.stopPropagation()
      state.add_task_focus = true
   })

}
```
*functional.js*

In my opinion, this approach is closer to what is in React, but it is not optimal in our case, since we have to rerender the application for each key pressing.

---

### <a name="solutions-oop-state">Save state of children components (OOP)</a>

To save state of children components in OOP, an approach close to React was used:
- When a component is changed, it is re-rendered
- When the order of the components is changed, they are re-rendered

Instead of 'resetting' the component and rerendering it with new child, 
it was decided to compare its children with new children from props and change them if they differ.

```javascript
class Component {

    [...]
   
    render(props) {
        
        [...]

       // First render of App - empty component
       if (component.innerHTML === '') {
          if (props.children && Array.isArray(props.children)) {
             component.append(...props.children)
          } else if (props.children) {
             component.append(props.children)
          }
       }
       
       if (props.children) {

            // If there are more incoming components than the initial ones 
            // (for example, a modal window has opened), 
            // then it is necessary to insert them without checking at the end.
            if (props.children.length > component.children.length) {
                for (let i = 0; i < props.children.length; i++) {
                    if (i < component.children.length) {
                        if (!component.children[i].isEqualNode(props.children[i])) {
                            component.children[i].replaceWith(props.children[i])
                        }
                    } else {
                        component.append(props.children[i])
                    }
                }
            } 
            
            // If the incoming components are smaller than the original ones 
            // (for example, the modal window has closed), 
            // then it is necessary to remove the latter
            else if (props.children.length < component.children.length) {
                for (let i = 0; i < component.children.length; i++) {
                    if (i < props.children.length) {
                        if (!component.children[i].isEqualNode(props.children[i])) {
                            component.children[i].replaceWith(props.children[i])
                        }
                    } else {
                        component.children[i].remove()
                    }
                }
            }

            // If the number of components is the same, 
            // then it is neccessary to compare them with each other
            else {
                for (let i = 0; i < props.children.length; i++) {
                    if (!component.children[i].isEqualNode(props.children[i])) {
                        component.children[i].replaceWith(props.children[i])
                    }
                }
            }
        }


        return component;
    }
    
}
```

---

### <a name='solutions-responsive'>Responsive Design</a>

Since adaptive design is considered as the standard these days, 
it was decided to optimize an application for all devices:

![desktop-version](readme-ing/desktop-version.png)

![mobile-version](readme-ing/mobile-version.png)


---

## <a name="components">Components</a>

All components were designed so that they could be reused in the future.

The decision to create a component was made based on the DRY principle - 
if an element was created manually too often (or may be created during further development), 
then a function (or class) was created instead, which generated the necessary element.

**The most interesting ones will be reviewed below**

---

### Modal

A modal window can be used often in an application. 

Therefore, it was decided to create a Component that accepts child HTML element 
and creates a modal window based on it.

```javascript
// Creating Overlay to cover all page with dark background
const overlay = document.createElement('div')
overlay.classList.add('overlay')
overlay.onclick = (event) => {
    closeModal()
}

// Modal Window with child Component
const modal = document.createElement('div')
modal.classList.add('modal')
modal.onclick = (event) => {
    event.stopPropagation()
}
modal.append(children)
```

For example, as a child, we can pass a component "AddTask":

![modal-addtask](readme-ing/modal-addtask.png)

And also we can pass the Tag component there:

![modal-tag](readme-ing/modal-tag.png)


This approach will allow you to create modal windows for 
various situations in the future and not write a lot of repetitive code.

---

### Button

The application uses two types of buttons: 
with a blue background and with a transparent background. 
Therefore, it was decided not to create separate components for the buttons, 
but to add an additional parameter isTransparent (false by default).

```javascript
const Button = ({text, isTransparent = false, onClick}) => {
    const button = document.createElement("button");

    if (isTransparent) {
        button.classList.add('button--isTransparent')
    }
}
```

Example:

![button](readme-ing/button.png)

---

### CustomCheckInput

A lot of code was used to create a Radio Input for the tag, 
so it was decided to create a separate Сomponent, which return label element.


One of the possible improvements for the App - creating the feature to select multiple tags at once. 
Therefore, when creating this component, you can select the input type: checkbox or radio:

```javascript
const CustomCheckInput = ({type = 'radio', name, value, outline, isDefault = false, children}) => {
    
    const input = document.createElement('input')
    input.type = ['checkbox', 'radio'].includes(type) ? type : 'radio'
}
```

Radio Example:

![radio-input](readme-ing/radio-input.png)

CheckBox Example:

![checkbox-input](readme-ing/checkbox-input.png)

---

## <a name="contacts">Contacts</a>

**TG**: [@mordvintsevmv](https://t.me/mordvintsevmv)

**e-mail**: mordvintsevmv@gmail.com


[🔝Content🔝](#content)


