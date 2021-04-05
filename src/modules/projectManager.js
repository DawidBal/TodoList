import DOM from "./DOMElements";

const projectManager = (() => {

    const projectList = {
        'Inbox': [],
    };

    const getProjectNames = () => { 
        return Object.keys(projectList);
    };

    const addNewProject = (e) => {
        e.preventDefault();
        const projectName = e.target.querySelector('input').value;
        projectList[projectName] = [];
        DOM.showProject(projectName);
        DOM.setNewTaskOption(projectName);
        e.target.reset();
    };

    return { projectList, addNewProject, getProjectNames }
})();

export default projectManager