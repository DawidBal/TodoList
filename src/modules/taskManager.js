import DOM from './DOMElements.js';
import todoItem from './todoCreation.js';

const taskManager = (() => {

    const todosArr = [];
       
    const addItemToArray = (arr, item) => arr.push(item);

    const createTodo = (data) => {
    const objFromData = Object.fromEntries(data);
    return todoItem(objFromData);
    };

    const addNewTask = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTodo = createTodo(formData);
    addItemToArray(todosArr, newTodo);
    DOM.showTask(newTodo, todosArr.indexOf(newTodo));
    e.target.reset();
    };

    const removeTask = (arr, event) => {
        if(!event.target.matches('button')) return;
        const taskIndex = event.target.parentNode.dataset.index;
        arr.splice(taskIndex, 1);
        DOM.removeTaskElement(taskIndex);
        DOM.showAllTasks(arr);
    };

    const fireEvents = () => {
        DOM.taskList.addEventListener('click', removeTask.bind(null, todosArr));
    }

return { todosArr, addNewTask, fireEvents }

})();

export default taskManager;