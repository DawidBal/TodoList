import DOM from './DOMElements';

const projectManager = (() => {

  const projects = ['Inbox'];

  let activeProject = 'Inbox';
  const defaultProject = 'Inbox';

  const getDefaultProject = () => defaultProject;

  const addNewProject = (e) => {
    e.preventDefault();
    const projectName = e.target.querySelector('input').value;
    projects.push(projectName);
    DOM.showNewProject(projectName);
    DOM.setNewTaskOption(projectName);
    DOM.removeProjectForm();
    e.target.reset()
  }

  const isAlreadyCreated = (projectName) => {
    return projects.includes(projectName.trim());
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
  }
  return {getActiveProject, setActiveProject, addNewProject, getAllProjects, removeProject, getDefaultProject, renameProject}
})();

export default projectManager;
