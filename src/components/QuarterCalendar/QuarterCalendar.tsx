import moment, { Moment } from 'moment';
import { useCallback, useEffect, useState } from 'react';
import useCalendar from '../../hooks/useCalendar';
import CalendarControls from './CalendarControls';
import HoverableCell from './HoverableCell';
import TaskForm from '../Tasks/TaskForm';
import { Button, Spacer, Modal, Flex } from '../Core';

import '../../styles/tableStyles.css';
import { ITask } from '../../types';

const QuarterCalendar = () => {
  const {
    currentQuarter,
    setCurrentQuarter,
    quarterDisplayValue,
    setQuarterDisplayValue,
    getCalendarData,
  } = useCalendar();
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const updateQuarter = useCallback(
    (date: Moment) => {
      const startOfQuarter = date.startOf('quarter');
      const formattedQuarter = `Q${startOfQuarter.format(
        'Q'
      )} ${startOfQuarter.format('YYYY')}`;

      setQuarterDisplayValue(formattedQuarter);
    },
    [setQuarterDisplayValue]
  );

  useEffect(() => {
    updateQuarter(currentQuarter);
  }, [currentQuarter, updateQuarter]);

  const handleNextQuarter = useCallback(() => {
    setCurrentQuarter(currentQuarter.clone().add(1, 'quarter'));
  }, [setCurrentQuarter, currentQuarter]);

  const handlePrevQuarter = useCallback(() => {
    setCurrentQuarter(currentQuarter.clone().subtract(1, 'quarter'));
  }, [setCurrentQuarter, currentQuarter]);

  const handleSelectTask = useCallback((task: ITask) => {
    setTaskToEdit(task);
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <CalendarControls
          handleNext={handleNextQuarter}
          handlePrev={handlePrevQuarter}
          displayValue={quarterDisplayValue}
        />
        <Spacer />
        <Flex sx={{ gap: 0 }}>
          <table className="table task-table">
            <thead>
              <tr>
                <th className="empty-header" colSpan={3}></th>
              </tr>
              <tr>
                <th>Task name</th>
                <th>Task start</th>
                <th>Task end</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr onClick={() => handleSelectTask(task)} key={task.name}>
                  <td>{task.name}</td>
                  <td>{moment(task.start).format('DD.MM.YYYY')}</td>
                  <td>{moment(task.end).format('DD.MM.YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                {getCalendarData().map((m) => (
                  <th key={m.monthLabel} colSpan={m.weeks.length}>
                    {m.monthLabel}
                  </th>
                ))}
              </tr>
              <tr>
                {getCalendarData().map((m) => {
                  return m.weeks.map((x) => <th key={x.label}>{x.label}</th>);
                })}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={`${task.name}_${i}`}>
                  {getCalendarData().map((x) =>
                    x.weeks.map((week) => (
                      <HoverableCell
                        key={`${task.name}_${week.label}`}
                        {...{ task, week, setTasks }}
                      />
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
        <Spacer />
        {tasks.length < 10 ? (
          <Flex sx={{ justifyContent: 'center' }}>
            <Button onClick={() => setAddTaskModalOpen(true)}>
              + Add task
            </Button>
          </Flex>
        ) : null}
        <Modal
          isOpen={isAddTaskModalOpen}
          onClose={() => setAddTaskModalOpen(false)}
        >
          <TaskForm
            setTasks={setTasks}
            afterSubmit={() => {
              setAddTaskModalOpen(false);
            }}
          />
        </Modal>
        <Modal isOpen={!!taskToEdit} onClose={() => setTaskToEdit(null)}>
          <TaskForm
            task={taskToEdit ?? undefined}
            setTasks={setTasks}
            afterSubmit={() => {
              setTaskToEdit(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default QuarterCalendar;
