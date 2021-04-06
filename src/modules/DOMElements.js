import taskManager from './taskManager.js';
import projectManager from './projectManager.js';
import { format } from 'date-fns';

// TODO: Divide this module into two modules - Task DOM module, and Projects DOM module.
const DOM = (() => {
  const taskForm = document.querySelector('.js-todo-from');
  const projectForm = document.querySelector('.js-project-from');
  const taskList = document.querySelector('.js-tasklist');
  const projectList = document.querySelector('.js-project-list');
  const selectList = document.querySelector('.js-projects');
  const projectsMenu = document.querySelector('.js-newProject');
  const inboxBtn = document.querySelector('.js-inbox');

  // Tasks
  const generateTaskHTML = (task, index) => {
    const newTask = document.createElement('div');
    newTask.setAttribute('data-index', index);
    newTask.classList.add(`priority-${task.priority}`);
    newTask.innerHTML = `<h2>${task.title}</h2>
            <label for="task-${index}"></label>
            <input type="checkbox" data-index="${index}" id="task-${index}" 
            ${task.completed === true ? `disabled` : ``}>
            <button>X</button>`;
    return newTask;
  };

  const showTasks = (taskArr) => {
    taskList.innerHTML = '';
    taskManager.saveTasks(taskArr);
    taskArr.forEach((task) => {
      const index = taskManager.tasks.indexOf(task);
      if(index === -1) return
      const newTask = generateTaskHTML(task, index);
      taskList.append(newTask);
    });
  };

  const showTask = (task, index) => taskList.append(generateTaskHTML(task, index));

  const removeTaskElement = (index) => {
    const element = document.querySelector(`[data-index="${index}"`);
    element.remove();
  };

  // Projects
  const generateOptionHTML = (projectName) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', projectName);
    newOption.textContent = projectName;
    return newOption;
  };

  const setTaskFormOptions = () => {
    const projects = projectManager.projects;
    projects.forEach((projectName) => {
      selectList.append(generateOptionHTML(projectName));
    });
  };

  const setNewTaskOption = (projectName) => selectList.append(generateOptionHTML(projectName));

  const generateProjectHTML = (projectName) => {
    const newProject = document.createElement('button');
    newProject.classList.add('c-projects__item');
    newProject.textContent = projectName;
    return newProject;
  };

  const showNewProject = (projectName) => projectList.append(generateProjectHTML(projectName));

  const showAllProjects = () => {
    projectList.innerHTML = '';
    const projectNames = projectManager.projects;
    projectNames.forEach((projectName) => {
      if(projectName === 'Inbox') return
      projectList.append(generateProjectHTML(projectName));
    });
  };

  const setActiveOption = (projectName) => {
    const options = selectList.querySelectorAll('option');
    options.forEach((option) => 
      option.value === projectName
        ? option.setAttribute('selected', '')
        : option.removeAttribute('selected')
    );
  };

  const switchActiveProject = (e) => {
    if (!e.target.matches('button')) return;
    const projectName = e.target.textContent;
    projectManager.setActiveProject(projectName);
    updateListTitle(projectName);
    setActiveOption(projectName);
    showTasks(taskManager.getTasksByProject(projectName));
  };

  // Events
  const fireEvents = () => {
    taskForm.addEventListener('submit', taskManager.addNewTask);
    projectForm.addEventListener('submit', projectManager.addNewProject);
    taskList.addEventListener('click', taskManager.removeTask);
    projectList.addEventListener('click', switchActiveProject);
    inboxBtn.addEventListener('click', switchActiveProject);
  };

  // Utilities

  const setInputDateToday = () => {
    const inputDate = document.querySelector('.js-date');
    inputDate.setAttribute('value', format(new Date(), 'yyyy-MM-dd'));
  };

  const updateListTitle = (name) => {
    const title = document.querySelector('.js-tasklist__title');
    title.textContent = name;
  };

  const init = () => {
    showAllProjects();
    setTaskFormOptions();
    fireEvents();
    setInputDateToday();
  };

  return {
    taskForm,
    taskList,
    showTasks,
    showTask,
    removeTaskElement,
    showNewProject,
    init,
    setTaskFormOptions,
    setNewTaskOption,
  };
})();
export default DOM;
