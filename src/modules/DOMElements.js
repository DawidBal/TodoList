import taskManager from './taskManager.js';
import projectManager from './projectManager.js';
import { format } from 'date-fns';
import { startOfToday, startOfTomorrow } from 'date-fns';

// TODO: Divide this module into two modules - Task DOM module, and Projects DOM module.
const DOM = (() => {
  // Utilities
  const taskForm = document.querySelector('.js-todo-from');
  const taskList = document.querySelector('.js-tasklist');
  const showTaskFormBtn = document.querySelector('.js-showTaskForm');
  const cancelTaskFormBtn = document.querySelector('.js-cancelTaskForm');
  const projectForm = document.querySelector('.js-project-from');
  const projectList = document.querySelector('.js-project-list');
  const selectList = document.querySelector('.js-projects');
  const showProjFormBtn = document.querySelector('.js-showProjectForm');
  const cancelProjFormBtn = document.querySelector('.js-cancelProjForm');
  const inboxBtn = document.querySelector('.js-inbox');
  const todayBtn = document.querySelector('.js-today');
  const tomorrowBtn = document.querySelector('.js-tomorrow');
  const printMsg = document.querySelector('.js-printMsg');

  const defaultProject = projectManager.getDefaultProject();

  const types = {
    Error: 'Error',
    Success: 'Success',
  };

  const removeElement = (element) => element.parentElement.removeChild(element);

  const removeElementDelay = (element, delay) => {
    setTimeout(() => removeElement(element), delay);
  };

  const toggleAnimation = (delay = 1000, name) => {
    let timer;
    return function (element) {
      clearTimeout(timer);
      element.classList.add(name);
      timer = setTimeout(() => {
        element.classList.remove(name);
      }, delay);
    };
  };

  const removeProjectsAnim = toggleAnimation(175, 'moveOut-left');
  const msgBoxAnim = toggleAnimation(1500, 'fadeIn-up');

  const clearInnerHTML = (element) => (element.innerHTML = '');

  const setInputDateToday = () => {
    const inputDate = document.querySelector('.js-date');
    inputDate.setAttribute('value', format(new Date(), 'yyyy-MM-dd'));
  };

  const updateListTitle = (name) => {
    const title = document.querySelector('.js-tasklist__title');
    title.textContent = name;
  };

  const printMessage = (message, type) => {
    type === types.Error
      ? (printMsg.style.cssText =
          '--printMsgColor: var(--secondary);--printTextColor: var(--white)')
      : (printMsg.style.cssText =
          '--printMsgColor: var(--main);--printTextColor: var(--bg)');

    printMsg.textContent = message;
    msgBoxAnim(printMsg);
  };

  const applyPriorityColor = (priority) => {
    switch (priority) {
      case '1':
        return 'var(--main)';
      case '2':
        return '#ffa700';
      case '3':
        return '#0585f7';
    }
  };

  const setActivePriority = ({selectElement, priorityValue}) => {
    const options = selectElement.querySelectorAll('option');
    options.forEach((option) => 
      option.value === priorityValue
        ? option.setAttribute('selected', '')
        : option.removeAttribute('selected')
    );
  };

  const init = () => {
    showAllProjects();
    setTaskFormOptions();
    fireEvents();
    setInputDateToday();
  };

  // Tasks
  const generateTaskHTML = (task, index) => {
    const newTask = document.createElement('div');
    newTask.setAttribute('data-index', index);
    newTask.classList.add(`c-tasklist__task`, `l-flexColumn`);
    newTask.innerHTML = `
<div class="c-task-actions l-flex l-jC-sb">
  <div class="c-task-toggle">
    <label for="task-${index}" class="checkbox" style="--priorityColor: ${applyPriorityColor(task.priority)}">
      <span class="checkbox__input">
        <input type="checkbox" data-action="toggle" id="task-${index}" ${task.completed ? `checked` : ``} />
        <span class="checkbox__control">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="none" stroke-width="3" d="M1.73 12.91l6.37 6.37L22.79 4.59" />
          </svg>
        </span>
      </span>
      <h2 class="radio__label">${task.title}</h2>
    </label>
  </div>
  <div class="c-task-options l-flex l-aI-c">
    <button class="btn btn--task l-flex l-aI-c" data-action="expand">
      <svg class="icon icon--task" data-action="expand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path data-action="expand" d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
      </svg>
    </button>
    <button class="btn btn--task l-flex l-aI-c" data-action="edit">
      <svg class="icon icon--task" data-action="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path data-action="edit" d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z" />
      </svg>
    </button>
    <button class="btn btn--task l-flex l-aI-c" data-action="remove">
      <svg class="icon icon--task" data-action="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path data-action="remove" d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" />
      </svg>
    </button>
  </div>
</div>
<div class="c-task-info l-flex l-jC-sb">
  <div class="c-task-info__date l-flex l-aI-c">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M24 23h-24v-19h4v-3h4v3h8v-3h4v3h4v19zm-1-15h-22v14h22v-14zm-16.501 8.794l1.032-.128c.201.93.693 1.538 1.644 1.538.957 0 1.731-.686 1.731-1.634 0-.989-.849-1.789-2.373-1.415l.115-.843c.91.09 1.88-.348 1.88-1.298 0-.674-.528-1.224-1.376-1.224-.791 0-1.364.459-1.518 1.41l-1.032-.171c.258-1.319 1.227-2.029 2.527-2.029 1.411 0 2.459.893 2.459 2.035 0 .646-.363 1.245-1.158 1.586.993.213 1.57.914 1.57 1.928 0 1.46-1.294 2.451-2.831 2.451-1.531 0-2.537-.945-2.67-2.206zm9.501 2.206h-1.031v-6.265c-.519.461-1.354.947-1.969 1.159v-.929c1.316-.576 2.036-1.402 2.336-1.965h.664v8zm7-14h-22v2h22v-2zm-16-3h-2v2h2v-2zm12 0h-2v2h2v-2z" />
    </svg>
    <p class="c-task-into__text">${taskManager.getTaskCompletionTime(task)}</p>
  </div>
  <div class="c-task-info__project">
    <p class="c-task-project-name">${task.project}</p>
  </div>
</div>
`;

    return newTask;
  };

  const showTasks = (taskArr) => {
    clearInnerHTML(taskList);
    taskManager.saveActiveTasks(taskArr);
    taskArr.forEach((task) => {
      const index = taskManager.tasks.indexOf(task);
      if (index === -1) return;
      const newTask = generateTaskHTML(task, index);
      taskList.append(newTask);
    });
  };

  const showTask = (task, index) =>
    taskList.append(generateTaskHTML(task, index));

  const removeTaskElement = (index) => {
    const element = document.querySelector(`[data-index="${index}"`);
    element.remove();
  };

  const showTimeTasks = (date, e) => {
    classHandler(e, 'btn--active');
    updateListTitle(e.target.textContent);
    const tasks = taskManager.tasks.filter((task) => {
      return new Date(task.endDate).getDate() - date.getDate() === 0;
    });
    showTasks(tasks);
  };

  const createTaskEditHTML = (task) => {

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);

    const taskForm = document.createElement('div');
    taskForm.classList.add('c-edit-form', 'l-flex');
    taskForm.innerHTML += 
    `
    <form class="c-form c-form--tasks l-flexColumn js-todo-from">
        <div class="l-flexColumn">
            <label for="title">Task name</label>
            <input class="c-form__text" type="text" id="title" name="title" value="${task.title}" required
                maxlength="80">
        </div>
        <div class="l-flexColumn">
            <label for="notes">Notes</label>
            <textarea class="c-form__text c-form__text--area" name="notes" id="notes" rows="3" cols="10"
                placeholder="Task notes">${task.notes}</textarea>
        </div>
        <div class="c-form__pickers">
            <div class="l-flexColumn">
                <label for="endDate">End Date</label>
                <input class="js-date" type="date" name="endDate" id="endDate" value=${task.endDate}>
            </div>
            <div class="l-flexColumn">
                <label for="priority">Priority</label>
                <select class="c-form__priority js-priority" id="priority" name="priority" autocomplete="off">
                    <option value="3">Low</option>
                    <option value="2">Medium</option>
                    <option value="1">High</option>
                </select>
            </div>
            <div class="l-flexColumn">
                <label for="project">Project</label>
                <select class="c-form__project js-edit-projects" id="project" name="project"
                    autocomplete="off"></select>
            </div>
        </div>
        <div class="c-form__ui">
            <button class="btn btn--form" type="submit">Add<svg class="icon icon--green"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z" />
                </svg></button>
            <button class="btn btn--form js-cancelTaskForm" type="reset">Cancel<svg class="icon icon--red"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                </svg></button>
        </div>
    </form>
    `
    document.body.append(taskForm);
  }

  const showTaskEditForm = (task) => {
    createTaskEditHTML(task);
    const projectsSelectElem = document.querySelector('.js-edit-projects');
    const prioritySelectElem = document.querySelector('.js-priority');
    setTaskFormOptions(projectsSelectElem);
    setActiveOption({selectElement: projectsSelectElem, projectName: task.project});
    setActivePriority({selectElement: prioritySelectElem, priorityValue: task.priority})
  };

  // Projects
  const generateOptionHTML = (projectName) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', projectName);
    newOption.textContent = projectName;
    return newOption;
  };

  const setTaskFormOptions = (selectElement = selectList) => {
    const projects = projectManager.getAllProjects();
    clearInnerHTML(selectElement);
    projects.forEach((projectName) => {
      selectElement.append(generateOptionHTML(projectName));
    });
  };

  const setNewTaskOption = (projectName) =>
    selectList.append(generateOptionHTML(projectName));

  const generateProjectHTML = (projectName) => {
    const newProject = document.createElement('button');
    newProject.classList.add('c-projects__item');
    newProject.classList.add('btn');
    newProject.setAttribute('data-action', 'change');
    newProject.innerHTML = `${projectName}<div class="c-projects__icons">
      <button class="btn btn--project l-flex l-aI-c" data-action="remove">
        <svg class="icon icon--project" data-action="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path data-action="remove" d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>
      </button>
    </div>`;
    return newProject;
  };

  const showNewProject = (projectName) =>
    projectList.append(generateProjectHTML(projectName));

  const showAllProjects = () => {
    clearInnerHTML(projectList);
    const projectNames = projectManager.getAllProjects();
    projectNames.forEach((projectName) => {
      if (projectName === defaultProject) return;
      projectList.append(generateProjectHTML(projectName));
    });
  };

  const setActiveOption = ({selectElement = selectList, projectName}) => {
    const options = selectElement.querySelectorAll('option');
    options.forEach((option) =>
      option.value === projectName
        ? option.setAttribute('selected', '')
        : option.removeAttribute('selected')
    );
  };


  const addClassList = (event, className) =>
    event.target.classList.add(className);

  /**
   *
   * @param {string} className
   * Remove given class on every element that contain this class
   */
  const removeClassList = (className) => {
    const allElements = document.querySelectorAll(`.${className}`);
    allElements.forEach((element) => element.classList.remove(className));
  };

  const classHandler = (event, className) => {
    removeClassList(className);
    addClassList(event, className);
  };

  const showProjectForm = () => showForm(projectForm, showProjFormBtn);
  const removeProjectForm = () => removeForm(projectForm, showProjFormBtn);

  const showTaskForm = () => showForm(taskForm, showTaskFormBtn);
  const removeTaskForm = () => removeForm(taskForm, showTaskFormBtn);

  const showForm = (form, toggler) => {
    form.parentElement.style.display = 'block';
    toggler.style.display = 'none';
  };

  const removeForm = (form, toggler) => {
    form.parentElement.style.display = 'none';
    toggler.style.display = 'flex';
  };

  

  // Events
  const fireEvents = () => {
    // Task Events
    taskForm.addEventListener('submit', taskManager.addNewTask);
    taskList.addEventListener('click', taskManager.taskEventHandler);
    showTaskFormBtn.addEventListener('click', showTaskForm);
    cancelTaskFormBtn.addEventListener('click', removeTaskForm);

    // Project Events
    projectForm.addEventListener('submit', projectManager.addNewProject);
    // Perform action when clicked on element that contains data-action attribute
    projectList.addEventListener('click', projectManager.projectEventHandler);
    showProjFormBtn.addEventListener('click', showProjectForm);
    cancelProjFormBtn.addEventListener('click', removeProjectForm);

    inboxBtn.addEventListener('click', projectManager.switchActiveProject);
    todayBtn.addEventListener('click',showTimeTasks.bind(null, startOfToday()));
    tomorrowBtn.addEventListener('click',showTimeTasks.bind(null, startOfTomorrow()));
  };

  return {
    taskForm,
    taskList,
    types,
    showTasks,
    showTask,
    showNewProject,
    showTaskEditForm,
    removeTaskElement,
    removeTaskForm,
    removeProjectForm,
    removeElementDelay,
    removeProjectsAnim,
    setTaskFormOptions,
    setNewTaskOption,
    setActiveOption,
    printMessage,
    classHandler,
    updateListTitle,
    init,
  };
})();

export default DOM;
