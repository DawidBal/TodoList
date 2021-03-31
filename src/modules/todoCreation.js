// const todoItem = ({title, description, dueDate, priority, notes, project}) => {
//     const init = {
//         "title": title,
//         "description": description,
//         "dueDate": dueDate,
//         "priority": priority,
//         "notes": notes,
//         "project": project,
//         "completed": false,
//     }

//     return Object.assign({}, init);
// }

const todoItem = ({title, priority, project}) => {
    const init = {
        "title": title,
        "priority": priority,
        "project": project,
        "completed": false,
    }

    return Object.assign({}, init);
}

export default todoItem;