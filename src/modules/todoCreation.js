import { format } from 'date-fns';

const todoItem = ({ title, notes, priority, project, endDate = '' }) => {
  const getTimeToday = () => format(new Date(), 'yyyy-MM-dd');

  const init = {
    title,
    notes,
    priority,
    project,
    startDate: getTimeToday(),
    endDate,
    completed: false,
  };

  return Object.assign({}, init);
};

export default todoItem;
