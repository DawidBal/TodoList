import DOM from './DOMElements.js';
import todoItem from './todoCreation.js';
import projectManager from './projectManager';

const taskManager = (() => {

  const tasks = [];

  let visibleTasks = [];

  const saveActiveTasks = (taskArray) => {
    visibleTasks = Array.from(taskArray);
  }

  const getActiveTasks = () => visibleTasks;

  const addItemToArray = (arr, item) => arr.push(item);

  const createTodo = (data) => {
    const objFromData = Object.fromEntries(data);
    return todoItem(objFromData);
  };

  const getTasksByProject = (projectName) => {
    return tasks.filter(task => task.project === projectName);
  }

  const changeTasksProject = (tasks, projectName) => {
    tasks.forEach(task => task.project = projectName);
  }
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
    const taskIndex = event.target.closest('.c-tasklist__item').dataset.index;
    tasks.splice(taskIndex, 1);
    DOM.removeTaskElement(taskIndex);
    DOM.showTasks(getActiveTasks());
  };

  return { tasks, addNewTask, removeTask, getTasksByProject, saveActiveTasks, getActiveTasks, changeTasksProject };
})();

export default taskManager;
