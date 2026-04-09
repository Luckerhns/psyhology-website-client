import React, { useEffect, useState } from "react";
import styles from "../styles/components/CustomCalendar.module.scss";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import { event, monthsRu, notSelectedTimes, weekDaysRu } from "../utils/data";
import { useActions } from "../hooks/useActions";
import CalendarHeaderComponent from "./Calendar/CalendarHeader";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FreeTimesCell from "./UI/Cells/FreeTimesCell";
import BusyTimesCell from "./UI/Cells/BusyTimesCell";
import { getCalendar } from "../http/recordApi";
import { findCurrentDate } from "../utils/functions";
import AdminCell from "./UI/Cells/AdminCell";
import { $user } from "../http";
import { ICalendarData } from "../types/Calendar";

const CustomCalendar = ({ withHeader }: any) => {
  const forAdmin = localStorage.getItem("isAdmin");
  const todayStr = `${new Date().getFullYear()}-${String(new Date().getDate()).padStart(2, "0")}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [currentDate, setCurrentDate] = useState(() => dayjs(todayStr));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2023-01-25"));
  const [day, setDay] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [weekDay, setWeekDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const { openRecordModalTimes, closeRecordModal, selectUserDate, setTimes } =
    useActions();
  const { selectedStateDate, allTimes, selectedUserDate } = useTypedSelector(
    (state) => state.recordModal,
  );

  const [events, setEvents] = useState(event);
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const calendar = await getCalendar();
        setEvents(calendar);
        setIsDataLoaded(true);
        console.log(calendar, "Updated calendar data loaded");
      } catch (error) {
        console.log(error, "Не удалось получить календарь!");
        setEvents(event);
        setIsDataLoaded(true);
      }
    };
    fetchCalendar();
  }, []);

  const currentWeekDay = weekDaysRu[weekDay - 1];

  const onPanelChange = (newValue: Dayjs) => {
    setCurrentDate(newValue);
    console.log(newValue, "Выбранная дата");
  };

  let [isDateExists, setIsDateExists] = useState(false);

  useEffect(() => {
    if (events?.length > 0) {
      for (let i = 0; i < events?.length; i++) {
        if (events[i].date !== selectedDate) {
          setIsDateExists(false);
        } else {
          setIsDateExists(true);
          break;
        }
      }
    }
  }, [selectedDate]);
  const onSelect = (newValue: Dayjs) => {
    setCurrentDate(newValue);
    setSelectedValue(newValue);
    setSelectedDate(newValue.format("YYYY-MM-DD"));

    selectUserDate(newValue.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setDay(currentDate.date());
    setMonth(currentDate.get("month"));
    setWeekDay(currentDate.day() + 1);
  }, [currentDate, selectedValue]);

  useEffect(() => {
    const allTimes = findCurrentDate(events, selectedDate);
    openRecordModalTimes(allTimes, selectedDate, events);
    setTimeout(() => closeRecordModal(), 200);
    console.log("UseEffect сворачивает модалку");
  }, []);

  const [dateExists, setDateExists] = useState(true);

  const openRecordModal = async (
    withModal?: boolean,
    date?: string,
    addNewDate?: boolean,
  ) => {
    const targetDate = date || selectedDate;

    const updatedEvents = events.some((e: any) => e.date === targetDate)
      ? events
      : [
          ...events,
          {
            date: targetDate,
            username: "",
            freeTimes: [],
            notSelectedTimes: [
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
            ],
            busyTimes: [],
          },
        ];
    setEvents(updatedEvents);

    const allTimes = findCurrentDate(updatedEvents, targetDate);
    !withModal && openRecordModalTimes(allTimes, targetDate, updatedEvents);

    setIsDateExists(true);
  };

  return (
    <div className={styles.calendar__section}>
      <Calendar
        locale={locale}
        onSelect={onSelect}
        value={currentDate}
        onPanelChange={onPanelChange}
        className={styles.my__calendar}
        headerRender={({ value, type, onChange, onTypeChange }: any) => (
          <CalendarHeaderComponent
            value={value}
            type={type}
            onChange={onChange}
            onTypeChange={onTypeChange}
            weekDay={currentWeekDay}
            day={day}
            monthsList={monthsRu[month]}
            currentYear={currentDate.get("year")}
            forAdmin={Boolean(localStorage.getItem("isAdmin"))}
            currentMonth={""}
          />
        )}
        cellRender={(date: any) => {
          const today = dayjs();
          if (date.isBefore(today, "day")) {
            return <div className={styles.disabled__cell}>Прошедшая дата</div>;
          }
          const eventDate = date.format("YYYY-MM-DD");

          const matchingEvent = events.find(
            (event: any) => event.date === eventDate,
          );

          if (!forAdmin) {
            if (matchingEvent) {
              //@ts-ignore
              return (
                <FreeTimesCell
                  eventDate={matchingEvent}
                  openRecordModal={openRecordModal}
                  events={events}
                  selectedCellDate={eventDate}
                  selectedRecordField={true}
                  isDateExists={isDateExists}
                />
              );
            } 
            return <div>Нету свободных дат</div>
          }

          if (forAdmin) {
            const matchingEvent = events.find(
              (event: any) => event.date === eventDate,
            ) as ICalendarData | undefined;
            return (
              <AdminCell
                eventDate={matchingEvent}
                openRecordModal={openRecordModal}
                events={events}
                selectedCellDate={eventDate}
                selectedRecordField={true}
                isDateExists={isDateExists}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default CustomCalendar;
