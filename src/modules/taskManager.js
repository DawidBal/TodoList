import DOM from './DOMElements.js';
import todoItem from './todoCreation.js';
import projectManager from './projectManager';

const taskManager = (() => {
  const addItemToArray = (arr, item) => arr.push(item);

  const createTodo = (data) => {
    const objFromData = Object.fromEntries(data);
    return todoItem(objFromData);
  };

  // TODO: Refactor function - Split into smaller funcitons, think about where to put DOM method.
  const addNewTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = createTodo(formData);
    const taskProject = projectManager.getProjectArray(newTodo.project);
    addItemToArray(taskProject, newTodo);
    if (newTodo.project === projectManager.getActiveProject()) {
      DOM.showTask(newTodo, taskProject.indexOf(newTodo));
    }
    e.target.reset();
  };

  return { addNewTask };
})();

export default taskManager;
