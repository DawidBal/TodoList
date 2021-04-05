import taskManager from './taskManager.js';
import projectManager from './projectManager.js';

const DOM = (() => {

    const taskForm = document.querySelector('.js-todo-from');
    const projectForm = document.querySelector('.js-project-from');
    const taskList = document.querySelector('.js-tasklist');
    const projectList = document.querySelector('.js-project-list');


    // Tasks
    const generateTaskHTML = (task, index) => {
        const newTask = document.createElement('div');
        newTask.setAttribute('data-index', index);
        newTask.classList.add(`priority-${task.priority}`);
        newTask.innerHTML = 
            `<h2>${task.title}</h2>
            <label for="task-${index}"></label>
            <input type="checkbox" data-index="${index}" id="task-${index}" ${task.completed === true ? `disabled` : ``}>
            <button>X</button>`;
        return newTask;
    };

    const showAllTasks = (taskArr) => {
        taskList.innerHTML = '';
        taskArr.forEach((task, index) => {
            const newTask = generateTaskHTML(task, index);
            taskList.append(newTask);
        });
    };

    const showTask = (task, index) => {
        taskList.append(generateTaskHTML(task, index));
    };
    
   const removeTaskElement = (index) => {
       const element = document.querySelector(`[data-index="${index}"`);
       element.remove();
   };

    // Projects
   const generateOptionHTML = (projectName) => {
        const newOption = document.createElement('option');
        newOption.setAttribute('value', projectName);
        newOption.textContent = projectName;
        return newOption
   }
   
    const setTaskFormOptions = () => {
        const list = document.querySelector('.js-projects');
        const projects = projectManager.getProjectNames();
        projects.forEach(projectName => {
            list.append(generateOptionHTML(projectName));
        });
    };

    const setNewTaskOption = (projectName) => {
        const list = document.querySelector('.js-projects');
        list.append(generateOptionHTML(projectName));
    }

    const generateProjectHTML = (projectName) => {
        const newProject = document.createElement('p'); // TODO: Change for buttons, to manage events
        newProject.textContent = projectName;
        return newProject
    };

    const showProject = (projectName) => {
        projectList.append(generateProjectHTML(projectName));
    }

    const showAllProjects = () => {
        projectList.innerHTML = '';
        const projectNames = projectManager.getProjectNames();
        projectNames.forEach(projectName => {
            projectList.append(generateProjectHTML(projectName));
        });
    }

    // Events
    const fireEvents = () => {
        taskForm.addEventListener('submit', taskManager.addNewTask);
        projectForm.addEventListener('submit', projectManager.addNewProject);
    }
    

    const init = () => {
        showAllProjects();
        setTaskFormOptions();
        fireEvents();
    }

    return { taskForm, taskList, showAllTasks, showTask, removeTaskElement, showProject, init, setTaskFormOptions, setNewTaskOption }

})();
export default DOM