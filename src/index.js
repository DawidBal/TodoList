import todoItem from './modules/todoCreation.js';
import DOM from './modules/DOMElements.js';

const app = (() => {

// TODO: After creating file structure, place todos Array in appropriate module
const todosArr = [];

// TODO: Move function to appropriate Todomanager module
const addNewTask = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const obj = {};

    for(const [key, value] of formData.entries()) {
        obj[key] = value;
    }

    addItemToArray(todosArr, obj);
    DOM.populateTasks(todosArr);

    e.target.reset();
};

// TODO: Move function to appropriate Todomanager module
const addItemToArray = (arr, item) => arr.push(item);



DOM.taskForm.addEventListener('submit', addNewTask);

})();