import { useMemo, useState } from 'react';
import { ITask, IWeek } from '../../types';
import useCalendar from '../../hooks/useCalendar';
import moment from 'moment';

const HoverCard = ({ task }: { task: ITask }) => {
  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '4px',
    width: '300px',
    height: '200px',
    right: 20,
    bottom: 10,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  };

  return (
    <div style={cardStyle}>
      <div>
        <h3>{task.name}</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <strong>Start:</strong>
          <span>{moment(task.start).format('DD.MM.YYYY')}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <strong>End:</strong>
          <span>{moment(task.end).format('DD.MM.YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

const HoverableCell = ({
  task,
  week,
  children,
}: {
  task: ITask;
  week: IWeek;
  children?: JSX.Element;
}) => {
  const { isWeekInTaskRange } = useCalendar();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isHoverable = isWeekInTaskRange(week, task);

  const cellStyle: React.CSSProperties = useMemo(
    () => ({
      position: 'relative',
      backgroundColor: isHoverable ? 'blue' : 'unset',
      cursor: isHoverable ? 'pointer' : 'unset',
      overflow: 'visible',
    }),
    [isHoverable]
  );

  return (
    <td
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cellStyle}
    >
      {children}
      {isHovered && isHoverable && <HoverCard task={task} />}
    </td>
  );
};

export default HoverableCell;
