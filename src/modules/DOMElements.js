import taskManager from './taskManager.js';

const DOM = (() => {

    const taskForm = document.querySelector('.c-form');
    const taskList = document.querySelector('.js-tasklist');

    const getTaskHTMLCode = (task, index) => {
        const newElement = document.createElement('div');
        newElement.setAttribute('data-index', index);
        newElement.classList.add(`priority-${task.priority}`);
        newElement.innerHTML = 
            `<h2>${task.title}</h2>
            <label for="task-${index}"></label>
            <input type="checkbox" data-index="${index}" id="task-${index}" ${task.completed === true ? `disabled` : ``}>
            <button>X</button>`;
        return newElement;
    };

    const showAllTasks = (taskArr) => {
        taskList.innerHTML = '';
        taskArr.forEach((task, index) => {
            const newTask = getTaskHTMLCode(task, index);
            taskList.appendChild(newTask);
        });
    };

    const showTask = (task, index) => {
        taskList.append(getTaskHTMLCode(task, index));
    };
    
   const removeTaskElement = (index) => {
       const element = document.querySelector(`[data-index="${index}"`);
       element.remove();
   };

    taskForm.addEventListener('submit', taskManager.addNewTask);

    return { taskForm, taskList, showAllTasks, showTask, removeTaskElement }

})();
export default DOM