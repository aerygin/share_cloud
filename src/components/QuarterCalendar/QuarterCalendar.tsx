import moment, { Moment } from 'moment';
import { useCallback, useEffect } from 'react';
import useCalendar from '../../hooks/useCalendar';
import CalendarControls from './CalendarControls';

import '../../styles.css';
import HoverableCell from './HoverableCell';

const QuarterCalendar = () => {
  const {
    currentQuarter,
    setCurrentQuarter,
    quarterDisplayValue,
    setQuarterDisplayValue,
    getMonths,
  } = useCalendar();
  const tasks = [
    { name: 'aaa', start: new Date('2023-08-29'), end: new Date('2023-08-31') },
    { name: 'bbb', start: new Date('2023-08-29'), end: new Date('2023-09-05') },
    { name: 'ccc', start: new Date('2023-09-20'), end: new Date('2023-09-30') },
    { name: 'ddd', start: new Date('2023-08-20'), end: new Date('2023-08-30') },
    { name: 'eee', start: new Date('2023-01-20'), end: new Date('2023-12-30') },
  ];

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

  return (
    <>
      <CalendarControls
        handleNext={handleNextQuarter}
        handlePrev={handlePrevQuarter}
        displayValue={quarterDisplayValue}
      />
      <div style={{ display: 'flex' }}>
        <table className="task-table " style={{ width: '400px' }}>
          <thead>
            <tr>
              <th colSpan={3}></th>
            </tr>
            <tr>
              <th>Task name</th>
              <th>Task start</th>
              <th>Task end</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.name}>
                <td>{task.name}</td>
                <td>{moment(task.start).format('DD.MM.YYYY')}</td>
                <td>{moment(task.end).format('DD.MM.YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="task-table">
          <thead>
            <tr>
              {getMonths().map((m) => (
                <th key={m.label} colSpan={m.weeks.length}>
                  {m.label}
                </th>
              ))}
            </tr>
            <tr>
              {getMonths().map((m) => {
                return m.weeks.map((x) => <th key={x.label}>{x.label}</th>);
              })}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={`${task.name}_${i}`}>
                {getMonths().map((x) =>
                  x.weeks.map((week) => (
                    <HoverableCell
                      key={`${task.name}_${week.label}`}
                      {...{ task, week }}
                    />
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuarterCalendar;
