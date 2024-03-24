import { $user } from ".";
import { CalendarData } from "../types/Calendar";
import { event } from "../utils/data";

export const newRecord = async (calendar: CalendarData) => {
  const data = await $user.post("api/admin/calendar/update-calendar", calendar);
  console.log(data);
  // return data;
  // console.log('gg')
  return data;
};

export const getCalendar = async () => {
  try {
    const { data } = await $user.post("api/admin/calendar/get-calendar");
    const calendar = Object.values(JSON.parse(data.record));

    console.log("SUCCESS", data, calendar);
    return calendar;
  } catch (error) {
    console.log("ERROR", error);
    return event;
  }
};

export const userNewRecord = async (dto: any) => {
  try {
    const { data } = await $user.post("api/busy-times/create-busy-record", {
      ...dto,
    });

    console.log(dto, data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBusyRecords = async () => {
  try {
    const { data } = await $user.post("api/busy-times/get-busy-times");
    console.log(data);
    return data.rows;
  } catch (error) {
    console.log("ERROR", error);
  }
};
