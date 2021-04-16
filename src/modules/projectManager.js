import DOM from './DOMElements';
import taskManager from './taskManager'

const projectManager = (() => {
  const projects = ['Inbox'];

  let activeTab = 'Inbox';
  const defaultTab = 'Inbox';

  const getDefaultTab = () => defaultTab;

  const addNewProject = (e) => {
    e.preventDefault();
    const projectName = e.target.querySelector('input').value;

    if (isAlreadyCreated(projectName)) {
      DOM.printMessage(`Project ${projectName} is already created`,
      DOM.types.Info);
      return;
    }

    projects.push(projectName);
    DOM.showNewProject(projectName);
    DOM.setNewTaskOption(projectName);
    DOM.removeProjectForm();
    e.target.reset();
  };

  const isAlreadyCreated = (projectName) => {
    return projects.includes(projectName);
  };

  // TODO: Add error handling
  const spliceProject = (projectName) => projects.splice(projects.indexOf(projectName), 1);

  const removeProject = (event) => {
    const parentElement = event.target.closest('.c-projects__item');
    const projectName = parentElement.childNodes[0].nodeValue;
    const tasksInProject = taskManager.getTasksByProject(projectName);
    const delayTime = 175;

    taskManager.changeTasksProject(tasksInProject, defaultTab);
    spliceProject(projectName);
    DOM.updateListTitle(defaultTab);
    projectManager.setActiveTab();
    DOM.setTaskFormOptions();
    DOM.removeProjectsAnim(parentElement);
    DOM.removeElementDelay(parentElement, delayTime);
  };

  const renameProject = (projectName, newProjectName) => {
    projects[projects.indexOf(projectName)] = newProjectName;
  };

  const switchActiveTab = (e) => {
    const projectName = e.target.childNodes[0].nodeValue;
    DOM.updateListTitle(projectName);
    setActiveTab();
    DOM.classHandler(e, 'btn--active');
    DOM.setActiveOption({projectName});
    DOM.showTasks(taskManager.getTasksByProject(projectName));
  };

  const getAllProjects = () => projects;

  const getActiveTab = () => activeTab;

  const setActiveTab = () => {
      const title = document.querySelector('.js-tasklist__title').textContent;
      activeTab = title;
  };

  const projectEventHandler = (event) => {
    const action = event.target.dataset.action;
    switch (action) {
      case 'change':
        switchActiveTab(event);
        break;
      case 'remove':
        removeProject(event);
        break;
    }
  };

  return {
    getActiveTab,
    getAllProjects,
    getDefaultTab,
    setActiveTab,
    addNewProject,
    spliceProject,
    renameProject,
    projectEventHandler,
    switchActiveTab
  };
})();

export default projectManager;
