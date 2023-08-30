import { Moment } from "moment";

export interface IWeek {
  label: string
  start: Date
  end: Date
}


export interface ITask {
  name: string
  description?: string
  start: Date
  end: Date
}