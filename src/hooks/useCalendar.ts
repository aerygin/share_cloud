import moment from 'moment';
import { Moment } from 'moment';
import { useCallback, useState } from 'react';
import { ICalendarDataItem, ITask, IWeek } from '../types';

const useCalendar = () => {
  const [quarterDisplayValue, setQuarterDisplayValue] = useState<string>('');
  const [currentQuarter, setCurrentQuarter] = useState<Moment>(moment());

  const calculateDaysInWeekByMonth = useCallback(
    ({
      weekStart,
      weekEnd,
      month,
    }: {
      weekStart: Moment;
      weekEnd: Moment;
      month: Moment;
    }) => {
      let daysInMonth = 0;

      for (
        let currentDay = weekStart.clone();
        currentDay.isSameOrBefore(weekEnd);
        currentDay.add(1, 'day')
      ) {
        if (currentDay.month() === month.month()) {
          daysInMonth++;
        }
      }

      return daysInMonth;
    },
    []
  );

  const getWeeks = useCallback(
    (startOfMonth: Moment) => {
      const weeks: IWeek[] = [];
      const endOfMonth = startOfMonth.clone().endOf('month');
      let currentWeekStart = startOfMonth
        .clone()
        .startOf('week')
        .startOf('day');
      let currentWeekEnd = currentWeekStart.clone().endOf('week').endOf('day');
      let daysInWeek = calculateDaysInWeekByMonth({
        weekStart: currentWeekStart,
        weekEnd: currentWeekEnd,
        month: startOfMonth,
      });

      while (
        currentWeekEnd.isBefore(endOfMonth) ||
        currentWeekEnd.isSame(endOfMonth, 'day') ||
        daysInWeek >= 4
      ) {
        if (daysInWeek >= 4) {
          weeks.push({
            start: currentWeekStart.toDate(),
            end: currentWeekEnd.toDate(),
            label: currentWeekStart.format('ww'),
          });
        }

        currentWeekStart = currentWeekEnd.clone().add(1, 'day');
        currentWeekEnd = currentWeekStart.clone().endOf('week');
        daysInWeek = calculateDaysInWeekByMonth({
          weekStart: currentWeekStart,
          weekEnd: currentWeekEnd,
          month: startOfMonth,
        });
      }

      return weeks;
    },
    [calculateDaysInWeekByMonth]
  );

  const getCalendarData = useCallback((): ICalendarDataItem[] => {
    const startOfQuarter = currentQuarter.startOf('quarter');
    const dataItems = [];

    for (let i = 0; i < 3; i++) {
      const startOfMonth = startOfQuarter.clone().add(i, 'months');
      dataItems.push({
        monthLabel: startOfMonth.format('MMM'),
        weeks: getWeeks(startOfMonth),
      });
    }

    return dataItems;
  }, [getWeeks, currentQuarter]);

  const isWeekInTaskRange = useCallback((week: IWeek, task: ITask) => {
    return (
      moment(task.start).isSameOrBefore(week.end) &&
      moment(task.end).isSameOrAfter(week.start)
    );
  }, []);

  return {
    getCalendarData,
    currentQuarter,
    setCurrentQuarter,
    quarterDisplayValue,
    setQuarterDisplayValue,
    isWeekInTaskRange,
  };
};

export default useCalendar;
