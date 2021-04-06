import DOM from './DOMElements';

const projectManager = (() => {

  const projects = ['Inbox'];

  let activeProject = 'Inbox';

  const addNewProject = (e) => {
    e.preventDefault();
    const projectName = e.target.querySelector('input').value;
    projects.push(projectName);
    DOM.showNewProject(projectName);
    DOM.setNewTaskOption(projectName);
    e.target.reset()
  }

  const getActiveProject = () => activeProject;

  const setActiveProject = (projectName) => {
    if(projects.includes(projectName)) {
      activeProject = projectName;
    } else {
      throw new Error("Missing project!");
    }
  }
  return {projects, getActiveProject, setActiveProject, addNewProject}
})();

export default projectManager;
