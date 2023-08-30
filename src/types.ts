export interface IWeek {
  label: string;
  start: Date;
  end: Date;
}

export interface ITask {
  name: string;
  description?: string;
  start: Date;
  end: Date;
  id: number;
}

export interface ICalendarDataItem {
  monthLabel: string;
  weeks: IWeek[];
}
