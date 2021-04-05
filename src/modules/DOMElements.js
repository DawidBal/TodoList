import taskManager from './taskManager.js';
import projectManager from './projectManager.js';
import { format } from 'date-fns';

const DOM = (() => {
  const taskForm = document.querySelector('.js-todo-from');
  const projectForm = document.querySelector('.js-project-from');
  const taskList = document.querySelector('.js-tasklist');
  const projectList = document.querySelector('.js-project-list');
  const selectList = document.querySelector('.js-projects');

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

  const showAllTasks = (taskArr) => {
    taskList.innerHTML = '';
    taskArr.forEach((task, index) => {
      const newTask = generateTaskHTML(task, index);
      taskList.append(newTask);
    });
  };

  const showTask = (task, index) => taskList.append(generateTaskHTML(task, index));

  const removeTaskElement = (index) => {
    const element = document.querySelector(`[data-index="${index}"`);
    element.remove();
  };

  const removeTask = (event) => {
    if (!event.target.matches('button')) return;
    const taskIndex = event.target.parentNode.dataset.index;
    const taskProject = projectManager.getProjectArray(
      projectManager.getActiveProject()
    );
    taskProject.splice(taskIndex, 1);
    removeTaskElement(taskIndex);
    showAllTasks(taskProject);
  };

  // Projects
  const generateOptionHTML = (projectName) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', projectName);
    newOption.textContent = projectName;
    return newOption;
  };

  const setTaskFormOptions = () => {
    const projects = projectManager.getProjectNames();
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
    const projectNames = projectManager.getProjectNames();
    projectNames.forEach((projectName) => {
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
    showAllTasks(projectManager.getProjectArray(projectManager.getActiveProject())
    );
  };

  // Events
  const fireEvents = () => {
    taskForm.addEventListener('submit', taskManager.addNewTask);
    projectForm.addEventListener('submit', projectManager.addNewProject);
    taskList.addEventListener('click', removeTask);
    projectList.addEventListener('click', switchActiveProject);
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
    showAllTasks,
    showTask,
    removeTaskElement,
    showNewProject,
    init,
    setTaskFormOptions,
    setNewTaskOption,
  };
})();
export default DOM;
