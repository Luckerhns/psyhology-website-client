import { CalendarData } from "../types/Calendar";

export const findCurrentDate = (
  events: CalendarData | any[],
  selectedDate: string
) => {
  const selected = events?.find((elem) => elem.date === selectedDate);
  return [
    Array.isArray(selected?.freeTimes) ? selected.freeTimes : [],
    Array.isArray(selected?.busyTimes) ? selected.busyTimes : [],
    Array.isArray(selected?.notSelectedTimes) ? selected.notSelectedTimes : ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]
  ];
};
export function eraseFreeTime(
  current: string,
  selectedStateDate: string,
  setCurrentFunc: any,
  events: any,
  setEvents: React.Dispatch<React.SetStateAction<any[]>>
) {
  setEvents((prevEvents: any[]) => {
    const newEvents = prevEvents.map((e: any) => {
      if (e.date === selectedStateDate) {
        const newFreeTimes = e.freeTimes.filter((target: string) => !target.includes(current));
        const newNotSelectedTimes = [...e.notSelectedTimes, current].sort((a, b) => parseInt(a) - parseInt(b));
        return { ...e, freeTimes: newFreeTimes, notSelectedTimes: newNotSelectedTimes };
      }
      return e;
    });
    return newEvents;
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
