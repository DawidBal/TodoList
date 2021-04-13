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

  const getActiveTasks = () => visibleTasks;

  const addItemToArray = (arr, item) => arr.push(item);

  const createTodo = (data) => {
    const objFromData = Object.fromEntries(data);
    return todoItem(objFromData);
  };

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

  const toggleComplete = (task) => {
    task.completed = !task.completed;
  };

  const taskEventHandler = (event) => {
    const action = event.target.dataset.action;
    switch (action) {
      case 'expand':
        console.log('Expandind');
        break;
      case 'edit':
        console.log('Editing');
        break;
      case 'remove':
        removeTask(event);
        break;
    }
  };

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
    e.target.reset();
  };

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
    toggleComplete,
    taskEventHandler,
    getTaskCompletionTime,
  };
})();

export default taskManager;
