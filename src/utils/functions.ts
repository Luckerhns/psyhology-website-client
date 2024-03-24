import { CalendarData, ICalendarData } from "../types/Calendar";
import { IUserBlank, IUserBlankArr } from "../types/types";

export default function getErrorByStatus(status: number) {
  const errorType: any = {
    500: "Серверная ошибка, попробуйте позже",
    409: "Пользователь с такими данными уже существует",
  };

  return errorType[status];
}

export const findCurrentDate = (
  events: CalendarData | any[],
  selectedDate: string
) => {
  const selected = events?.find((elem) => elem.date === selectedDate);
  return [selected?.freeTimes, selected?.busyTimes, selected?.notSelectedTimes];
};

export function eraseFreeTime(
  current: string,
  selectedStateDate: string,
  setCurrentFunc: any,
  events: any,
  setEvents: any
) {
  events.map((e: any) => {
    if (e.date === selectedStateDate) {
      e.freeTimes.map((target: string, i: number) => {
        if (target.includes(current)) {
          //@ts-ignore
          setEvents((prevData) => [
            ...prevData,
            //@ts-ignore
            e.notSelectedTimes.push(target),
          ]);
          //@ts-ignore
          setEvents((prevData) => [...prevData, e.freeTimes.splice(i, 1)]);
        }
      });
    }
  });

  setCurrentFunc("notSelectedTimes");
}

export function sortReadyList(
  target: string,
  events: any,
  selectedStateDate: string
) {
  const currentDate = events.find((date: any) => {
    return date.date === selectedStateDate;
  });
  if (target === "freeTimes") {
    currentDate?.freeTimes.sort((prev: string, next: string): any => {
      return parseInt(prev) - parseInt(next);
    });
  }
  if (target === "notSelectedTimes") {
    currentDate?.notSelectedTimes.sort((prev: string, next: string): any => {
      return parseInt(prev) - parseInt(next);
    });
  }
}

export function activeButton(
  firstname: string,
  lastname: string,
  patronymic: string,
  time: string,
  phone: string,
  validEmail: boolean
): any {
  const args = [firstname, lastname, patronymic, time, phone];
  return args.every((e: any) => {
    if (phone.length < 10) {
      return false;
    }
    if (validEmail === true) {
      return true;
    }
    console.log(e);
    return e.length > 3 ? true : false;
  });
}

const mailExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function checkEmail(e: any) {
  const isCorrect = mailExp.test(String(e).toLowerCase());
  if (!isCorrect) return false;
  else return true;
}

export const getDateIsActive = (currentDate: number[], currentRecord: number[]) => {
  if (currentDate[0] < currentRecord[0]) {
    if (currentDate[1] < currentRecord[1]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
