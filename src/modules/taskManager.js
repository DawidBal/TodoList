import DOM from './DOMElements.js';
import todoItem from './todoCreation.js';
import projectManager from './projectManager';

const taskManager = (() => {

  const tasks = [];

  let visibleTasks = [];

  const saveTasks = (taskArray) => {
    visibleTasks = Array.from(taskArray);
  }

  const getSavedTasks = () => visibleTasks;

  const addItemToArray = (arr, item) => arr.push(item);

  const createTodo = (data) => {
    const objFromData = Object.fromEntries(data);
    return todoItem(objFromData);
  };

  const getTasksByProject = (projectName) => {
    return tasks.filter(task => task.project === projectName);
  }

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
    if (!event.target.matches('button')) return;
    const taskIndex = event.target.parentNode.dataset.index;
    tasks.splice(taskIndex, 1);
    DOM.removeTaskElement(taskIndex);
    DOM.showTasks(getSavedTasks());
  };

  return { tasks, addNewTask, removeTask, getTasksByProject, saveTasks, getSavedTasks };
})();

export default taskManager;
