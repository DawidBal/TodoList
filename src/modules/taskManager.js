import DOM from './DOMElements.js';
import todoItem from './todoCreation.js';
import projectManager from './projectManager';
import {format, differenceInCalendarDays } from 'date-fns'

const taskManager = (() => {
  const tasks = [];

  let visibleTasks = [];

  const saveActiveTasks = (taskArray) => {
    visibleTasks = Array.from(taskArray);
  };
  
  const addItemToArray = (arr, item) => arr.push(item);

    // TODO: Refactor function - Split into smaller funcitons, think about where to put DOM method.
  const addNewTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = createTodo(formData);
    addItemToArray(tasks, newTodo);
    if (newTodo.project === projectManager.getActiveProject()) {
      DOM.showTask(newTodo, tasks.indexOf(newTodo));
      visibleTasks.push(newTodo);
    }
    DOM.removeTaskForm();
    e.target.reset();
  };
  
  const createTodo = (data) => {
    const objFromData = Object.fromEntries(data);
    return todoItem(objFromData);
  };

  const getActiveTasks = () => visibleTasks;
  
  const getTasksByProject = (projectName) => {
    return tasks.filter((task) => task.project === projectName);
  };

  const getTaskCompletionTime = (task) => {
     const today = format(new Date(), 'yyyy-MM-dd');
     const daysDiff = differenceInCalendarDays(new Date(task.endDate), new Date(today))
     if(daysDiff === 0) {
       return 'Today'
     } else if(daysDiff === 1) {
       return 'Tomorrow'
     } else {
       return format(new Date(task.endDate), 'dd.MM');
     }

  };

  const changeTasksProject = (tasks, projectName) => {
    tasks.forEach((task) => (task.project = projectName));
  };

  const toggleTaskCompletion = (task) => {
    task.completed = !task.completed;
  };

  const taskEventHandler = (event) => {
    const action = event.target.dataset.action;
    const taskIndex = event.target.closest('.c-tasklist__task').dataset.index;
    switch (action) {
      case 'toggle':
        toggleTaskCompletion(tasks[taskIndex]);
        break;
      case 'expand':
        console.log('Expandind');
        break;
      case 'edit':
        DOM.showTaskEditForm(tasks[taskIndex]);
        handleEditEvents(taskIndex);
        break;
      case 'remove':
        removeTask(event);
        break;
    }
  };

  const updateTaskData = (taskIndex, newData) => {
    tasks[taskIndex] = createTodo(newData);
  }

  const handleEditEvents = (taskIndex) => {
    const cancel = document.querySelector('.js-edit-cancel');
    const form = document.querySelector('.js-update-from');
    const editForm = document.querySelector('.c-edit-form');
    const overlay = document.querySelector('.overlay');

    const removeEditElements = () => {
        editForm.remove();
        overlay.remove();
    };

    cancel.addEventListener('click', () => removeEditElements(), 
    {once: true});

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updateData = new FormData(e.target);
      updateTaskData(taskIndex, updateData);
      DOM.updateTask(tasks[taskIndex], taskIndex);
      removeEditElements();
    }, {once: true})
  }


  const removeTask = (event) => {
    const taskIndex = event.target.closest('.c-tasklist__task').dataset.index;
    tasks.splice(taskIndex, 1);
    DOM.removeTaskElement(taskIndex);
    DOM.showTasks(getActiveTasks());
  };

  return {
    tasks,
    addNewTask,
    removeTask,
    getTasksByProject,
    saveActiveTasks,
    getActiveTasks,
    changeTasksProject,
    changeTasksProject,
    taskEventHandler,
    getTaskCompletionTime,
  };
})();

export default taskManager;
