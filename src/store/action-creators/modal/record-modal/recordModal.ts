import { notSelectedTimes } from "./../../../../components/Calendar/CalendarModal";
export interface RecordModalState {
  isRecordOpen: boolean;
  allTimes: [string[], string[]];
  error: string;
  selectedStateDate: string;
  allDates: [] | any[];
  userError: string;
  selectedUserDate: string;
  selectedTime: string;
}

export enum RecordActionsEnum {
  OPEN_RECORD = "OPEN_RECORD",
  CLOSE_RECORD = "CLOSE_RECORD",
  SET_TIMES = "SET_TIMES",
  SET_ERROR = "SET_ERROR",
  SELECT_DATE = "SELECT_DATE",
  SELECT_USER_DATE = "SELECT_USER_DATE",
  GET_DATES = "GET_DATES",
  SET_USER_ERROR = "SET_USER_ERROR",
  SET_SELECTED_TIME = "SET_SELECTED_TIME",
}

export interface SetRecordModalOpen {
  type: RecordActionsEnum.OPEN_RECORD;
  payload: boolean;
}

export interface SetRecordModalClose {
  type: RecordActionsEnum.CLOSE_RECORD;
  payload: boolean;
}

export interface SetRecordModalTimes {
  type: RecordActionsEnum.SET_TIMES;
  payload: [string[], string[]];
}

export interface SetRecordModalError {
  type: RecordActionsEnum.SET_ERROR;
  payload: string;
}

export interface SelectRecordModalDate {
  type: RecordActionsEnum.SELECT_DATE;
  payload: string;
}

export interface SelectUserModalDate {
  type: RecordActionsEnum.SELECT_USER_DATE;
  payload: string;
}

export interface SetUserError {
  type: RecordActionsEnum.SET_USER_ERROR;
  payload: string;
}

export interface GetDatesRecordModalState {
  type: RecordActionsEnum.GET_DATES;
  payload: [
    {
      date: any;
      notSelectedTimes: any;
      freeTimes: any;
      busyTimes: any;
      username: string;
    }
  ];
}

export interface SetSelectedTime {
  type: RecordActionsEnum.SET_SELECTED_TIME;
  payload: string;
}

export type RecordModalAction =
  | SetRecordModalOpen
  | SetRecordModalClose
  | SetRecordModalTimes
  | SetRecordModalError
  | SelectRecordModalDate
  | GetDatesRecordModalState
  | SetUserError
  | SelectUserModalDate
  | SetSelectedTime;
