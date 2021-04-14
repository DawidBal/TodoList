import DOM from './DOMElements';
import taskManager from './taskManager'

const projectManager = (() => {
  const projects = ['Inbox'];

  let activeProject = 'Inbox';
  const defaultProject = 'Inbox';

  const getDefaultProject = () => defaultProject;

  const addNewProject = (e) => {
    e.preventDefault();
    const projectName = e.target.querySelector('input').value;

    if (isAlreadyCreated(projectName)) {
      DOM.printMessage(`Project ${projectName} is already created`,
      DOM.types.Error);
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
  const spliceProject = (projectName) => {
    projects.splice(projects.indexOf(projectName), 1);
  };

  const removeProject = (event) => {
    const parentElement = event.target.closest('.c-projects__item');
    const projectName = parentElement.childNodes[0].nodeValue;
    const tasksInProject = taskManager.getTasksByProject(projectName);
    const delayTime = 175;

    spliceProject(projectName);
    DOM.updateListTitle(defaultProject);
    projectManager.setActiveProject(defaultProject);
    taskManager.changeTasksProject(tasksInProject, defaultProject);
    DOM.setTaskFormOptions();
    DOM.removeProjectsAnim(parentElement);
    DOM.removeElementDelay(parentElement, delayTime);
  };

  const renameProject = (projectName, newProjectName) => {
    projects[projects.indexOf(projectName)] = newProjectName;
  };

  const switchActiveProject = (e) => {
    const projectName = e.target.childNodes[0].nodeValue;
    DOM.classHandler(e, 'btn--active');
    setActiveProject(projectName);
    DOM.updateListTitle(projectName);
    DOM.setActiveOption({projectName});
    DOM.showTasks(taskManager.getTasksByProject(projectName));
  };

  const getAllProjects = () => projects;

  const getActiveProject = () => activeProject;

  const setActiveProject = (projectName) => {
    if (isAlreadyCreated(projectName)) {
      activeProject = projectName;
    } else {
      throw new Error('Missing project!');
    }
  };

  const projectEventHandler = (event) => {
    const action = event.target.dataset.action;
    switch (action) {
      case 'change':
        switchActiveProject(event);
        break;
      case 'remove':
        removeProject(event);
        break;
    }
  };

  return {
    getActiveProject,
    getAllProjects,
    getDefaultProject,
    setActiveProject,
    addNewProject,
    spliceProject,
    renameProject,
    projectEventHandler,
    switchActiveProject
  };
})();

export default projectManager;
