import DOM from './DOMElements';

const projectManager = (() => {

  const projects = ['Inbox'];

  let activeProject = 'Inbox';
  const defaultProject = 'Inbox';

  const getDefaultProject = () => defaultProject;

  const addNewProject = (e) => {
    e.preventDefault();
    const projectName = e.target.querySelector('input').value;

    if(isAlreadyCreated(projectName)) {
      DOM.printMessage(`Project ${projectName} is already created`, DOM.types.Error);
      return;
    }

    projects.push(projectName);
    DOM.showNewProject(projectName);
    DOM.setNewTaskOption(projectName);
    DOM.removeProjectForm();
    e.target.reset()
  }

  const isAlreadyCreated = (projectName) => {
    return projects.includes(projectName);
  }

  // TODO: Add error handling
  const removeProject = (projectName) => {
    projects.splice(projects.indexOf(projectName), 1);
  }

  const renameProject = (projectName, newProjectName) => {
    projects[projects.indexOf(projectName)] = newProjectName;
  }

  const getAllProjects = () => projects;

  const getActiveProject = () => activeProject;

  const setActiveProject = (projectName) => {
    if(isAlreadyCreated(projectName)) {
      activeProject = projectName;
    } else {
      throw new Error("Missing project!");
    }
  };

  const projectEventHandler = (event) => {
    const action = event.target.dataset.action;
    switch (action) {
      case 'change':
        DOM.switchActiveProject(event);
        break;
      case 'remove':
        DOM.removeProject(event);
        break;
  }
  return {getActiveProject, setActiveProject, addNewProject, getAllProjects, removeProject, getDefaultProject, renameProject}
})();

export default projectManager;
