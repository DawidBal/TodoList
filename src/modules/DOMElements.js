import taskManager from './taskManager.js';
import projectManager from './projectManager.js';

const DOM = (() => {

    const taskForm = document.querySelector('.js-todo-from');
    const projectForm = document.querySelector('.js-project-from');
    const taskList = document.querySelector('.js-tasklist');
    const projectList = document.querySelector('.js-project-list');


    // Tasks
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

    // Projects

    const getProjectHTMLCode = (projectName) => {
        const newElement = document.createElement('p'); // TODO: Change for buttons, to manage events
        newElement.textContent = projectName;
        return newElement
    };

    const showProject = (projectName) => {
        projectList.append(getProjectHTMLCode(projectName));
    }

    const showAllProjects = () => {
        projectList.innerHTML = '';
        const projectNames = projectManager.getProjectNames();
        projectNames.forEach(projectName => {
            projectList.append(getProjectHTMLCode(projectName));
        });
    }

    // Events 
    taskForm.addEventListener('submit', taskManager.addNewTask);
    projectForm.addEventListener('submit', projectManager.addNewProject);

    const init = () => {
        showAllProjects();
    }

    return { taskForm, taskList, showAllTasks, showTask, removeTaskElement, showProject, init }

})();
export default DOM