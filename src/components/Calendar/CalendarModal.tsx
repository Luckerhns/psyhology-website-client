import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../styles/UI/CalendarModal.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Button, Dropdown, MenuProps } from "antd";
import PhoneInput from "react-phone-input-2";
import { activeButton, checkEmail, eraseFreeTime, sortReadyList } from "../../utils/functions";
import { event } from "../../utils/data";

const recordTypesEnum = [
  "Психология отношений",
  "Проработка травм",
  "Психологическая неустойка",
];

export const notSelectedTimes = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const CalendarModal = () => {
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [currentFunc, setCurrentFunc] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [accessForm, setAccessForm] = useState(Boolean);
  const [events, setEvents] = useState(event);

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [patronymic, setPatronymic] = useState("")

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)

  const isAdmin = localStorage.getItem("isAdmin");

  const items: MenuProps["items"] = [];
  const recordType: MenuProps["items"] = [];

  const { saveNewCalendar, closeRecordModal, setSelectedTime, createRecord } = useActions();

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

  const checkPhoneFunction = (e: string) => {
    setPhone(e);
    if (phone.length >= 11) {
      setAccessForm(true);
    } else {
      setAccessForm(false);
    }
  };

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

  useEffect(() => {}, []);

  useEffect(() => {
    allTimes[0] &&
      //@ts-ignore
      allTimes[0].map((el, i) => {
        console.log(selectedTime, selectedUserDate, "ALLTIMES RECORD MODAL");
        items.push({
          key: i,
          label: (
            <div
              onClick={(e) => {
                setSelectedTime(el as string);
              }}
            >
              {el}
            </div>
          ),
        });
      });
  }, [items]);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setValidEmail(checkEmail(email))
    console.log(validEmail, 'VALID')
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
      {!isAdmin && (
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.record__modal__title}>
            <span>Выберите время</span>
            <span>|</span>
            <span>{!activeButton(firstname, lastname, patronymic, selectedTime, phone, validEmail) ? "Заполните поля" : "Отлично"}</span>
            </div>
          <div className={styles.record__modal__body}>
            <div className={styles.left__record__container}>
              <Dropdown trigger={["click"]} menu={{ items: items }}>
                <Button>{selectedTime}</Button>
              </Dropdown>
              <input placeholder="email" className={styles.email__input} style={{border: validEmail ? "" : "2px solid red"}} type="text" value={email} onChange={(e) => changeEmail(e)} />
              <PhoneInput
                value={phone}
                country={"ru"}
                onChange={(e) => checkPhoneFunction(e)}
                inputStyle={{ width: "100%", marginLeft: 20 }}
              />
            </div>
            <div className={styles.right__record__container}>
              <div className={styles.user__dto__fields}>
                <input type="text" placeholder="Фамилия" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <input type="text" placeholder="Имя" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <input type="text" placeholder="Отчество" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
              </div>
            </div>
          </div>
          <div
            className={
              !accessForm
                ? styles.record__time__btn
                : `${styles.record__time__btn} ${styles.disabled}`
            }
            onClick={!activeButton(firstname, lastname, patronymic, selectedTime, phone, validEmail) ? () => {
              
            } : () => {
              
              createRecord(selectedUserDate, selectedTime, firstname, lastname, patronymic, phone, email)
            }}
          >
            Записаться
          </div>
        </div>
      )}

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
                // console.log(e.date === selectedStateDate)
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
