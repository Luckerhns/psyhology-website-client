import {
  RecordActionsEnum,
  RecordModalAction,
  RecordModalState,
} from "./recordModal";

export const initialState: RecordModalState = {
  isRecordOpen: false,
  allTimes: [[""], [""]],
  error: "",
  selectedStateDate: "",
  allDates: [],
  userError: "",
  selectedUserDate: "",
  selectedTime: "Выберите время",
};

export const recordModalReducer = (
  state = initialState,
  action: RecordModalAction
):RecordModalState => {
  switch (action.type) {
    case RecordActionsEnum.OPEN_RECORD:
      return {
        ...state,
        isRecordOpen: true,
      };

    case RecordActionsEnum.CLOSE_RECORD:
      return {
        ...state,
        isRecordOpen: false,
      };

    case RecordActionsEnum.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case RecordActionsEnum.SET_TIMES:
      return {
        ...state,
        allTimes: action.payload,
      };

    case RecordActionsEnum.SELECT_DATE:
      return {
        ...state,
        selectedStateDate: action.payload,
      };
    case RecordActionsEnum.GET_DATES:
      return {
        ...state,
        allDates: action.payload,
      };

    case RecordActionsEnum.SET_USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };

    case RecordActionsEnum.SELECT_USER_DATE:
      return {
        ...state,
        selectedUserDate: action.payload,
      };

    case RecordActionsEnum.SET_SELECTED_TIME:
      return {
        ...state,
        selectedTime: action.payload,
      };

    default:
      return state;
  }
};
