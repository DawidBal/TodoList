import { format } from 'date-fns';

const todoItem = ({ title, description, priority, project, endDate = '' }) => {
  const getTimeToday = () => format(new Date(), 'yyyy-MM-dd');

  const init = {
    title,
    description,
    priority,
    project,
    startDate: getTimeToday(),
    endDate,
    completed: false,
  };

  return Object.assign({}, init);
};

export default todoItem;
