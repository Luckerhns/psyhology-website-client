import { IUserRecord } from "./../../../../types/Calendar";
import { newRecord, userNewRecord } from "../../../../http/recordApi";
import { AppDispatch } from "../../../store";
import {
  GetDatesRecordModalState,
  RecordActionsEnum,
  SelectRecordModalDate,
  SelectUserModalDate,
  SetRecordModalClose,
  SetRecordModalError,
  SetRecordModalOpen,
  SetRecordModalTimes,
  SetSelectedTime,
  SetUserError,
} from "./recordModal";

export const RecordActionCreators = {
  openRecordModal: (): SetRecordModalOpen => ({
    type: RecordActionsEnum.OPEN_RECORD,
    payload: true,
  }),

  closeRecordModal: (): SetRecordModalClose => ({
    type: RecordActionsEnum.CLOSE_RECORD,
    payload: false,
  }),

  setRecordError: (error: string): SetRecordModalError => ({
    type: RecordActionsEnum.SET_ERROR,
    payload: error,
  }),

  setUserError: (error: string): SetUserError => ({
    type: RecordActionsEnum.SET_USER_ERROR,
    payload: error,
  }),

  setTimes: (allTimes: [string[], string[]]): SetRecordModalTimes => ({
    type: RecordActionsEnum.SET_TIMES,
    payload: allTimes,
  }),

  selectDate: (date: string): SelectRecordModalDate => ({
    type: RecordActionsEnum.SELECT_DATE,
    payload: date,
  }),

  selectUserDate: (date: string): SelectUserModalDate => ({
    type: RecordActionsEnum.SELECT_USER_DATE,
    payload: date,
  }),

  getDates: (dates: any): GetDatesRecordModalState => ({
    type: RecordActionsEnum.GET_DATES,
    payload: dates,
  }),

  setSelectedTime: (time: string): SetSelectedTime => ({
    type: RecordActionsEnum.SET_SELECTED_TIME,
    payload: time,
  }),

  openRecordModalTimes:
    (allTimes: any, date: string, dates?: any) =>
    async (dispatch: AppDispatch) => {
      try {
        setTimeout(() => {
          try {
            dispatch(RecordActionCreators.openRecordModal());
            dispatch(RecordActionCreators.setTimes(allTimes));
            dispatch(RecordActionCreators.selectDate(date));
            dispatch(RecordActionCreators.getDates(dates));
          } catch (error) {
            dispatch(
              RecordActionCreators.setRecordError("Ошибка в получении времени")
            );
          }
        });
      } catch (error) {
        dispatch(
          RecordActionCreators.setRecordError("Ошибка получения данных")
        );
        console.log(error);
      }
    },

  OpenUserModalTimes:
    (allTimes: any, currentDate: string, dates?: any) =>
    async (dispatch: AppDispatch) => {
      try {
        setTimeout(() => {
          try {
            dispatch(RecordActionCreators.openRecordModal());
            dispatch(RecordActionCreators.selectUserDate(currentDate));
            dispatch(RecordActionCreators.setTimes(allTimes));
            dispatch(RecordActionCreators.getDates(dates));
          } catch (error) {
            RecordActionCreators.setUserError("Ошибка в получении данных");
          }
        });
      } catch (error) {}
    },

  saveNewCalendar: (record: any) => async (dispatch: AppDispatch) => {
    try {
      setTimeout(async () => {
        try {
          const updatedCalendar = await newRecord(record);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {}
  },

  logOut: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem("isAdmin");
      window.location.reload();
    } catch (error) {}
  },

  createRecord:
    (
      date: string,
      time: string,
      firstname: string,
      lastname: string,
      patronymic: string,
      number: string,
      email: string
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        setTimeout(async () => {
          try {
            const dto = [
              date,
              time,
              firstname,
              lastname,
              patronymic,
              number,
              email,
            ];
            const { data } = await userNewRecord(dto);

            console.log(data);
            return data;
          } catch (error) {
            console.log(error);
            RecordActionCreators.setUserError(
              "Сейчас нельзя выполнить запись, попробуйте позже!"
            );
          }
        });
      } catch (error) {
        dispatch(
          RecordActionCreators.setRecordError(
            "Ошибка при создании записи, попробуйте позже!"
          )
        );
      }
    },
};
