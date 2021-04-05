import { format } from 'date-fns';

const todoItem = ({ title, description, priority, project, endTask = '' }) => {
  const getTimeToday = () => format(new Date(), 'dd/MM/yyyy');

  const init = {
    title,
    description,
    priority,
    project,
    startTask: getTimeToday(),
    endTask,
    completed: false,
  };

  return Object.assign({}, init);
};

export default todoItem;
