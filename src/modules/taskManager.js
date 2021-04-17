import DOM from './DOMElements.js';
import todoItem from './todoCreation.js';
import projectManager from './projectManager';
import {format, differenceInCalendarDays } from 'date-fns'

const taskManager = (() => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  let visibleTasks = [];

  const saveActiveTasks = (taskArray) => {
    visibleTasks = Array.from(taskArray);
  };
  
  const addItemToArray = (arr, item) => arr.push(item);

  const addToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const addNewTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = createTodo(formData);
    addItemToArray(tasks, newTodo);
    if (newTodo.project === projectManager.getActiveTab() || getTaskCompletionTime(newTodo) === projectManager.getActiveTab()) {
      DOM.showTask(newTodo, tasks.indexOf(newTodo));
      visibleTasks.push(newTodo);
    }
    DOM.removeTaskForm();
    addToLocalStorage();
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

  const getDateBasedTasks = (date) => {
   const dateTasks = tasks.filter((task) => {
      return new Date(task.endDate).getDate() - date.getDate() === 0;
    });
    return dateTasks;
  }

  const changeTasksProject = (tasks, projectName) => {
    tasks.forEach((task) => (task.project = projectName));
    addToLocalStorage();
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
        addToLocalStorage();
        break;
      case 'expand':
        DOM.expandTask(event);
        break;
      case 'edit':
        if(tasks[taskIndex].completed === false) {
          DOM.showTaskEditForm(tasks[taskIndex]);
          handleEditEvents(taskIndex);
        } else {
          DOM.printMessage("Cannot modify completed task!", DOM.types.Info);
        }
        break;
      case 'remove':
        removeTask(event);
        addToLocalStorage();
        break;
    }
  };

  const updateTaskData = (taskIndex, newData) => {
    const data = Object.fromEntries(newData);
    for (const [key, value] of Object.entries(data)) {
      tasks[taskIndex][key] = value;
    }
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
      addToLocalStorage();
    }, {once: true})
  }


  const removeTask = (event) => {
    const taskElement = event.target.closest('.c-tasklist__task');
    const taskIndex = taskElement.dataset.index;
    tasks.splice(taskIndex, 1);
    DOM.removeTaskAnim(taskElement);
    setTimeout(() => DOM.showTasks(visibleTasks), 175);
  };

  return {
    tasks,
    addNewTask,
    removeTask,
    getTasksByProject,
    getActiveTasks,
    getTaskCompletionTime,
    getDateBasedTasks,
    saveActiveTasks,
    changeTasksProject,
    changeTasksProject,
    taskEventHandler,
  };
})();

export default taskManager;
