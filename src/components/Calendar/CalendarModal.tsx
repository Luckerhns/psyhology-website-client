import React, { useEffect, useState } from "react";
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
    //@ts-ignore
    setTimeout(setEvents(allDates), 200);
  }, [allDates]);

  useEffect(() => {
    sortReadyList(currentFunc, events, selectedStateDate);
  }, [events]);

  function addNewFreeTime(current: string) {
    let selectedObjectIndex: number = 0;
    events.map((e, i) => {
      if (e.date == selectedStateDate) {
        selectedObjectIndex = i;
        e.notSelectedTimes.map((target, i) => {
          //@ts-ignore
          if (target.includes(current)) {
            //@ts-ignore
            setEvents((prevData) => [...prevData, e.freeTimes.push(target)]);
            //@ts-ignore
            setEvents((prevData) => [
              ...prevData,
              e.notSelectedTimes.splice(i, 1),
            ]);
          }
        });
      }
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
            <div className={styles.selected__times}>
              <div className={styles.admin__free__time}>
                <h5>Свободное время</h5>
                {events.map((e) => {
                  {
                    return (
                      e.date === selectedStateDate &&
                      e.freeTimes.map((freeTime) => (
                        <div
                          onDoubleClick={async (e: any) => {
                            eraseFreeTime(
                              e.target.textContent,
                              selectedStateDate,
                              setCurrentFunc,
                              events,
                              setEvents
                            );
                          }}
                        >
                          {freeTime}
                        </div>
                      ))
                    );
                  }
                })}
              </div>
              <div className={styles.admin__busy__time}>
                <h5>Занятое время</h5>
                {events.map((e) => {
                  {
                    return (
                      e.date === selectedStateDate &&
                      // @ts-ignore
                      e.busyTimes.map((busyTime) => <div>{busyTime.time}</div>)
                    );
                  }
                })}
              </div>
            </div>
            <div className={styles.not__selected__times}>
              <h5>Не выбранное время</h5>
              {events.map((e) => {
                if (e.date === selectedStateDate) {
                  return e.notSelectedTimes.map((time) => (
                    <div
                      onDoubleClick={async (e: any) => {
                        addNewFreeTime(e.target.textContent);
                      }}
                    >
                      {time}
                    </div>
                  ));
                }
              })}
            </div>
          </div>
          <div
            onClick={() => saveNewCalendar(allDates)}
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
