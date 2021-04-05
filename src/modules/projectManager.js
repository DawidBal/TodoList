import DOM from './DOMElements';

const projectManager = (() => {
  const projectList = {
    Inbox: [],
  };

  let activeProject = 'Inbox';

  const setActiveProject = (projectName) => {
    if (projectList.hasOwnProperty(projectName)) {
      activeProject = projectName;
    } else {
      throw new Error("ERROR");
    }
  };

  const getActiveProject = () => activeProject;

  const getProjectNames = () => Object.keys(projectList);

  const getProjectArray = (projectName) => projectList[projectName];

  const debugprojList = () => console.log(projectList);

  const addNewProject = (e) => {
    e.preventDefault();
    const projectName = e.target.querySelector('input').value;
    projectList[projectName] = [];
    DOM.showNewProject(projectName);
    DOM.setNewTaskOption(projectName);
    e.target.reset();
  };

  return {
    activeProject,
    projectList,
    addNewProject,
    getProjectNames,
    getProjectArray,
    debugprojList,
    setActiveProject,
    getActiveProject,
  };
})();

export default projectManager;
