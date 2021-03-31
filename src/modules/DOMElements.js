import taskManager from './taskManager.js';

const DOM = (() => {

    const taskForm = document.querySelector('.c-form');
    const taskList = document.querySelector('.js-tasklist');

    // TODO: Refactor function
    const showAllTasks = (taskArr) => {
        taskList.innerHTML = 
        taskArr.map((task, index) => {
            return `
            <div data-index="${index}" class="priority-${task.priority}">
                <h2>${task.title}</h2>
                <label for="task-${index}"></label>
                <input type="checkbox" data-index="${index} id="task-${index}" ${task.completed === true ? `disabled` : ``}>
                <button>X</button>
            </div>`
        }).join('');
    };

    // TODO: Refactor function
    const showTask = (task, index) => {
        const newElement = document.createElement('div');
        newElement.setAttribute('data-index', index);
        newElement.classList.add(`priority-${task.priority}`);
        newElement.innerHTML += `
                <h2>${task.title}</h2>
                <label for="task-${index}"></label>
                <input type="checkbox" data-index="${index} id="task-${index}" ${task.completed === true ? `disabled` : ``}>
                <button>X</button>
            `;
        taskList.append(newElement);
    };
    
   const removeTaskElement = (index) => {
       const element = document.querySelector(`[data-index="${index}"`);
       element.remove();
   };

    const removeTask = (arr, event) => {
        if(!event.target.matches('button')) return;
        const index = event.target.parentNode.dataset.index;
        arr.splice(index, 1);
        removeTaskElement(index);
        showAllTasks(arr);
    };
    
    taskForm.addEventListener('submit', taskManager.addNewTask);
    taskList.addEventListener('click', removeTask.bind(null, taskManager.todosArr));

    return { taskForm, showAllTasks, showTask }

})();
export default DOM