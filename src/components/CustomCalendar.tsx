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

const CustomCalendar = ({ withHeader, forAdmin }: any) => {
  const [currentDate, setCurrentDate] = useState(() => dayjs("2023-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2023-01-25"));
  const [day, setDay] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [weekDay, setWeekDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const {
    openRecordModalTimes,
    closeRecordModal,
    selectUserDate,
    setTimes,
  } = useActions();
  const { selectedStateDate, allTimes, selectedUserDate } = useTypedSelector(
    (state) => state.recordModal
  );

  const [events, setEvents] = useState(event);

  useEffect(() => {
    getCalendar()
      .then((value) => {
        //@ts-ignore
        setEvents(value ? value : event);
      })
      //@ts-ignore
      .catch(console.log("ERROR"));
  }, []);

  const currentWeekDay = weekDaysRu[weekDay - 1];

  const onPanelChange = (newValue: Dayjs) => {
    setCurrentDate(newValue);
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
    console.log("GGGG");
  }, []);

  // localStorage.clear()

  const [dateExists, setDateExists] = useState(true);

  const openRecordModal = async (
    withModal?: boolean,
    date?: string,
    addNewDate?: boolean
  ) => {
    const listLength = events?.length;
    const allTimes = findCurrentDate(events, selectedStateDate);
    !withModal && openRecordModalTimes(allTimes, selectedDate, events);
    if (!isDateExists && addNewDate) {
      //@ts-ignore
      setEvents((prevState) => [
        ...prevState,
        {
          date: date ? date : String(selectedDate),
          username: "",
          freeTimes: [],
          //@ts-ignore
          notSelectedTimes: [...notSelectedTimes],
          busyTimes: [],
        },
      ]);
    }
    console.log("GGGG");
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
          />
        )}
        cellRender={(date: any) => {
          let counter = 0;
          let dateCounter = 0;

          if (!forAdmin) {
            return (
              events !== undefined &&
              events.map((eventDate, key: number) => {
                const busyTimesLength = eventDate.busyTimes.length;
                const freeTimesLength = eventDate.freeTimes.length;

                const selectedRecordField =
                  date.format("YYYY-MM-DD") === selectedDate;

                if (eventDate.date.includes(date.format("YYYY-MM-DD"))) {
                  dateCounter++;

                  if (freeTimesLength < 1 && +dateCounter === 1) {
                    dateCounter = 0;
                    return <BusyTimesCell key={key} />;
                  } else {
                    dateCounter = 0;
                    return (
                      <FreeTimesCell
                        events={events}
                        selectedRecordField={selectedRecordField}
                      />
                    );
                  }
                } else {
                  counter++;
                  if (counter === +events.length) {
                    return <BusyTimesCell key={key} />;
                  }
                }
                return <div></div>;
              })
            );
          }

          // ADMIN CALENDAR

          if (forAdmin) {
            const selectedRecordField =
              date.format("YYYY-MM-DD") === selectedDate;
            const selectedCellDate = date.format("YYYY-MM-DD");
            let counter = 0;
            if (events.length > 0) {
              return events.map((eventDate, key: number) => {
                if (eventDate.busyTimes.length > 0 && counter < 1) {
                  counter++;
                  return (
                    <AdminCell
                      openRecordModal={openRecordModal}
                      eventDate={eventDate}
                      selectedCellDate={selectedCellDate}
                      selectedRecordField={selectedRecordField}
                      events={events}
                      key={key}
                      isDateExists={isDateExists}
                    />
                  );
                } else {
                  counter = 1;
                  if (counter > 1) {
                    return <div>error</div>;
                  }
                }
              });
            } else {
              return (
                <div className={`${styles.record__cell}`}>
                  <div className={styles.admin__btn__container}>
                    <div
                      style={{ opacity: selectedRecordField ? 1 : 0 }}
                      className={styles.admin__btn}
                      onClick={
                        selectedRecordField ? () => openRecordModal() : () => {}
                      }
                    >
                      редактировать
                    </div>
                  </div>
                </div>
              );
            }
          }
        }}
      />
    </div>
  );
};

export default CustomCalendar;
