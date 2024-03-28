import { $user } from ".";
import { CalendarData } from "../types/Calendar";
import { event } from "../utils/data";

export const newRecord = async (calendar: CalendarData) => {
  const data = await $user.post("api/admin/calendar/update-calendar", calendar);
  return data;
};

export const getCalendar = async () => {
  try {
    const { data } = await $user.post("api/admin/calendar/get-calendar");
    const calendar = data ? Object.values(JSON.parse(data.record)) : data;
    return calendar;
  } catch (error) {
    console.log("Ошибка получения календаря!", error);
    return event;
  }
};

export const userNewRecord = async (dto: any) => {
  try {
    const { data } = await $user.post("api/busy-times/create-busy-record", {
      ...dto,
    });

    return data;
  } catch (error) {
    console.log("Ошибка в создании записи!", error);
  }
};

export const getBusyRecords = async () => {
  try {
    const { data } = await $user.post("api/busy-times/get-busy-times");
    return data.rows;
  } catch (error) {
    console.log("Ошибка в получении готовых записей!", error);
  }
};
