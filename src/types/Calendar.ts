export interface IBusyTime {
  time?: string;
}

export interface ICalendarData {
  date: string;
  username: string;
  notSelectedTimes: string[] | [];
  freeTimes: string[] | [];
  busyTimes: IBusyTime[] | [];
}

export interface IBusyRecord {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  phone: string;
  time: string;
  date: string;
}

export interface IAdminCell {
  selectedRecordField: boolean;
  eventDate: ICalendarData;
  openRecordModal: any;
  events?: any;
  selectedCellDate?: string
}

export interface IFreeTimesCell {
  selectedRecordField: boolean;
  events: CalendarData;
}

// export type CellType = IAdminCell | IFreeTimesCell

export type CalendarData = ICalendarData[];

export interface IUserRecord {
  date: string;
  time: string;
  firstname: string;
  lastname: string;
  patronymic: string | null;
  number: string;
  email: string;
}
