import todoItem from './todoCreation.js';
import DOM from './DOMElements.js';

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
    console.log(newTodo);

    addItemToArray(todosArr, newTodo);
    DOM.showTask(newTodo, todosArr.indexOf(newTodo));
    console.log(todosArr);

    e.target.reset();
    };

return { todosArr, addNewTask }

})();

export default taskManager;