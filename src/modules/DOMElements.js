import taskManager from './taskManager.js';
import projectManager from './projectManager.js';
import { format } from 'date-fns';
import { startOfToday, startOfTomorrow } from 'date-fns'

// TODO: Divide this module into two modules - Task DOM module, and Projects DOM module.
const DOM = (() => {
  const taskForm = document.querySelector('.js-todo-from');
  const taskList = document.querySelector('.js-tasklist');
  const projectForm = document.querySelector('.js-project-from');
  const projectList = document.querySelector('.js-project-list');
  const selectList = document.querySelector('.js-projects');
  const showProjFormBtn = document.querySelector('.js-showProjectForm');
  const cancelProjFormBtn = document.querySelector('.js-cancelProjForm');
  const inboxBtn = document.querySelector('.js-inbox');
  const todayBtn = document.querySelector('.js-today');
  const tomorrowBtn = document.querySelector('.js-tomorrow');

  const defaultProject = projectManager.getDefaultProject();

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
    clearInnerHTML(taskList);
    taskManager.saveActiveTasks(taskArr);
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

  const showTimeTasks = (date, e) => {
    classHandler(e, 'btn--active');
    updateListTitle(e.target.textContent);
    const tasks = taskManager.tasks.filter(task => {
      return new Date(task.endDate).getDate() - date.getDate() === 0;
    });
    showTasks(tasks);
  }

  // Projects
  const generateOptionHTML = (projectName) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', projectName);
    newOption.textContent = projectName;
    return newOption;
  };

  const setTaskFormOptions = () => {
    const projects = projectManager.getAllProjects();
    projects.forEach((projectName) => {
      selectList.append(generateOptionHTML(projectName));
    });
  };

  const setNewTaskOption = (projectName) => selectList.append(generateOptionHTML(projectName));

  const generateProjectHTML = (projectName) => {
    const newProject = document.createElement('button');
    newProject.classList.add('c-projects__item');
    newProject.classList.add('btn');
    newProject.setAttribute('data-action', 'change');
    newProject.innerHTML = 
    `${projectName}<div class="c-projects__icons">
      <button class="btn btn--project" data-action="edit">
        <svg class="icon icon--project" data-action="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z"/></svg>
      </button>
      <button class="btn btn--project" data-action="remove">
        <svg class="icon icon--project" data-action="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>
      </button>
    </div>`
    return newProject;
  };

  const showNewProject = (projectName) => projectList.append(generateProjectHTML(projectName));

  const showAllProjects = () => {
    clearInnerHTML(projectList);
    const projectNames = projectManager.getAllProjects();
    projectNames.forEach((projectName) => {
      if(projectName === defaultProject) return
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

  const addClassList = (event, className) => event.target.classList.add(className);

  /**
   * 
   * @param {string} className 
   * Remove given class on every element that contain this class
   */
  const removeClassList = (className) => {
    const allElements = document.querySelectorAll(`.${className}`);
    allElements.forEach(element => element.classList.remove(className));
  };

  const classHandler = (event, className) => {
    removeClassList(className);
    addClassList(event, className);
  };
  
  const eventHandler = (event) => {
    const action = event.target.dataset.action;
    switch(action) {
      case 'change': switchActiveProject(event);
        break;
      case 'edit': 
        break;
      case 'remove': removeProject(event);
        break;
    }
  };

 

  const removeProject = (event) => {
    const parentElement = event.target.closest('.c-projects__item');
    const projectName = parentElement.textContent.trim();
    const tasksInProject = taskManager.getTasksByProject(projectName);
    const delayTime = 175;

    projectManager.removeProject(projectName);
    updateListTitle(defaultProject);
    projectManager.setActiveProject(defaultProject);
    taskManager.changeTasksProject(tasksInProject, defaultProject);
    toggleAnimation(parentElement, delayTime, 'fade-out');
    removeElementDelay(parentElement, delayTime);
  }

  const switchActiveProject = (e) => {
    const projectName = e.target.textContent;
    classHandler(e, 'btn--active');
    projectManager.setActiveProject(projectName);
    updateListTitle(projectName);
    setActiveOption(projectName);
    showTasks(taskManager.getTasksByProject(projectName));
  };

  const showProjectForm = () => {
    projectForm.parentElement.style.display = 'block';
    showProjFormBtn.style.display = 'none';
  }

  const removeProjectForm = () => {
    projectForm.parentElement.style.display = 'none';
    showProjFormBtn.style.display = 'flex';
  }


  // Events
  const fireEvents = () => {

    // Task Events
    taskForm.addEventListener('submit', taskManager.addNewTask);
    taskList.addEventListener('click', taskManager.removeTask);

    // Project Events
    projectForm.addEventListener('submit', projectManager.addNewProject);
    // Perform action when clicked on element that contains data-action attribute
    projectList.addEventListener('click', eventHandler);
    showProjFormBtn.addEventListener('click', showProjectForm);
    cancelProjFormBtn.addEventListener('click', removeProjectForm);

    inboxBtn.addEventListener('click', switchActiveProject);
    todayBtn.addEventListener('click', showTimeTasks.bind(null, startOfToday()));
    tomorrowBtn.addEventListener('click', showTimeTasks.bind(null, startOfTomorrow()));
  };

  // Utilities

  const removeElement = (element) => element.parentElement.removeChild(element);

  const removeElementDelay = (element, delay) => {
    setTimeout(() => removeElement(element), delay);
  };

  const toggleAnimation = (element, delay = 1000, name) => {
    element.classList.add(name);
    setTimeout(() => {
      element.classList.remove(name);
    }, delay);
  };

  const clearInnerHTML = (element) => element.innerHTML = '';

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
    removeProjectForm,
  };
})();
export default DOM;
