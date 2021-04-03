import {format} from 'date-fns';

const todoItem = ({title, description, priority, project}) => {

    const getTimeToday = () => format(new Date(), 'dd/MM/yyyy');

    const init = {
        "title": title,
        "description": description,
        "priority": priority,
        "project": project,
        "startTask": getTimeToday(),
        "completed": false,
    }

    return Object.assign({}, init);
}

export default todoItem;