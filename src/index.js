import DOM from './modules/DOMElements.js';
import taskManager from './modules/taskManager.js';
import todoItem from './modules/todoCreation.js';


const app = (() => {
    taskManager.fireEvents();    
    DOM.init();

})();

