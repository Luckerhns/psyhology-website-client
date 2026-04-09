import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/UI/CalendarModal.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { MenuProps } from "antd";
import PhoneInput from "react-phone-input-2";
import {
  activeButton,
  checkEmail,
  eraseFreeTime,
  sortReadyList,
} from "../../utils/functions";
import { event } from "../../utils/data";
import UserModal from "../UI/Modal/UserModal";

const CalendarModal = () => {
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [currentFunc, setCurrentFunc] = useState<string>("");
  const [accessForm, setAccessForm] = useState(Boolean);
  const [events, setEvents] = useState(event);

  const notSelectedRef = useRef<HTMLDivElement>(null);
  const freeTimesRef = useRef<HTMLDivElement>(null);

  const isAdmin = localStorage.getItem("isAdmin");

  const items: MenuProps["items"] = [];
  const recordType: MenuProps["items"] = [];

  const { saveNewCalendar, closeRecordModal, setSelectedTime, createRecord } =
    useActions();

  const {
    isRecordOpen,
    allTimes,
    selectedStateDate,
    allDates,
    selectedUserDate,
    selectedTime,
  } = useTypedSelector((state) => state.recordModal);

  useEffect(() => {
    setEvents(allDates);
  }, [allDates]);

  useEffect(() => {
    if (currentFunc) {
      sortReadyList(currentFunc, events, selectedStateDate);
    }
  }, [currentFunc, selectedStateDate, events]);

  function addNewFreeTime(current: string) {
    setEvents((prevEvents) => {
      return prevEvents.map((e) => {
        if (e.date === selectedStateDate) {
          const newNotSelectedTimes = e.notSelectedTimes.filter(
            (target: string) => !target.includes(current),
          );
          const newFreeTimes = [...e.freeTimes, current].sort(
            (a: string, b: string) => parseInt(a.replace(/:/g, '')) - parseInt(b.replace(/:/g, '')),
          );
          return {
            ...e,
            notSelectedTimes: newNotSelectedTimes,
            freeTimes: newFreeTimes,
          };
        }
        return e;
      });
    });
    setCurrentFunc("freeTimes");
  }

  return (
    <div
      className={
        isRecordOpen
          ? `${styles.main__container__time} ${styles.active}`
          : styles.main__container__time
      }
      onClick={closeRecordModal}
    >
      {!isAdmin && <UserModal />}

      {/* //
        // SECOND ADMIN SECTION
        // */}

      {isAdmin && (
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div>Выберите свободное время</div>
          <div className={styles.admin__modal__content}>
            <div ref={notSelectedRef} className={styles.not__selected__times}>
              <h5>Не выбранное время</h5>
{(() => {
                const matchingEvent = events.find(
                  (e: any) => e.date === selectedStateDate,
                );
                if (!matchingEvent || !Array.isArray(matchingEvent.notSelectedTimes)) {
                  return <div>Нет данных</div>;
                }
                return matchingEvent.notSelectedTimes
                  .filter(Boolean)
                  .map((time: string) => (
                    <div
                      key={time}
                      onClick={() => {
                        addNewFreeTime(time);
                      }}
                    >
                      {time}
                    </div>
                  ));
              })()}
            </div>
            <div ref={freeTimesRef} className={styles.admin__free__time}>
              <h5>Свободное время</h5>
{(() => {
                const matchingEvent = events.find(
                  (e: any) => e.date === selectedStateDate,
                );
                if (!matchingEvent || !Array.isArray(matchingEvent.freeTimes)) {
                  return <div>Нет данных</div>;
                }
                return matchingEvent.freeTimes
                  .filter(Boolean)
                  .map((freeTime: string) => (
                    <div
                      onClick={() => {
                        eraseFreeTime(
                          freeTime,
                          selectedStateDate,
                          setCurrentFunc,
                          events,
                          setEvents,
                        );
                      }}
                    >
                      {freeTime}
                    </div>
                  ));
              })()}
            </div>
            <div className={styles.admin__busy__time}>
              <h5>Занятое время</h5>
{(() => {
                const matchingEvent = events.find(
                  (e: any) => e.date === selectedStateDate,
                );
                if (!matchingEvent || !Array.isArray(matchingEvent.busyTimes)) {
                  return <div>Нет данных</div>;
                }
                return matchingEvent.busyTimes
                  .filter(Boolean)
                  .map((busyTime: any, index: number) => (
                    <div key={`busy-${index}`}>
                      {typeof busyTime === "string"
                        ? busyTime
                        : (busyTime as any)?.time || JSON.stringify(busyTime)}
                    </div>
                  ));
              })()}
            </div>
          </div>
          <div
            onClick={() => saveNewCalendar(events)}
            className={styles.record__time__btn}
          >
            Сохранить
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarModal;
