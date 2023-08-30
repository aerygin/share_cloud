import { SetStateAction, useMemo, useState } from 'react';
import { ITask, IWeek } from '../../types';
import useCalendar from '../../hooks/useCalendar';
import moment from 'moment';
import { Flex } from '../Core';

const HoverCard = ({ task }: { task: ITask }) => {
  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    width: '300px',
    height: '150px',
    right: 20,
    bottom: 10,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    overflow: 'hidden',
  };

  return (
    <div style={cardStyle}>
      <h3>{task.name}</h3>
      <Flex>
        <strong>Start:</strong>
        <span>{moment(task.start).format('DD.MM.YYYY')}</span>
      </Flex>
      <Flex>
        <strong>End:</strong>
        <span>{moment(task.end).format('DD.MM.YYYY')}</span>
      </Flex>
      <Flex>
        <strong>Description:</strong>
        <div
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {task.description || '-'}
        </div>
      </Flex>
    </div>
  );
};

const HoverableCell = ({
  task,
  week,
  children,
  setTasks,
}: {
  task: ITask;
  week: IWeek;
  setTasks: React.Dispatch<SetStateAction<ITask[]>>;
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
      backgroundColor: isHoverable ? '#007bff' : 'unset',
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
