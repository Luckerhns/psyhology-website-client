import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
import { activeButton, checkEmail } from "../../../utils/functions";
import { Button, Dropdown, MenuProps } from "antd";
import PhoneInput from "react-phone-input-2";
import styles from "../../../styles/UI/UserModal.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getCalendar } from "../../../http/recordApi";
import { ICalendarData } from "../../../types/Calendar";

const UserModal = () => {
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const [accessForm, setAccessForm] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [calendar, setCalendar] = useState<ICalendarData[]>([]);

  const { selectedUserDate, selectedTime } = useTypedSelector(
    (state) => state.recordModal,
  );

  const { setSelectedTime, createRecord, saveNewCalendar } = useActions();

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidEmail(checkEmail(newEmail));
  };

  const checkPhoneFunction = (e: string) => {
    setPhone(e);
    console.log(e);
    if (e.length >= 11) {
      setAccessForm(true);
    } else {
      setAccessForm(false);
    }
  };

  const selectTime = useCallback(
    (time: string) => {
      setSelectedTime(time);
    },
    [setSelectedTime],
  );

  useEffect(() => {
    const fetchAllTimes = async () => {
      try {
        const calendarData: ICalendarData[] = await getCalendar();
        setCalendar(calendarData);
        const selectedDateData = calendarData.find(
          (day) => day.date === selectedUserDate,
        );
        if (selectedDateData && selectedDateData.freeTimes.length > 0) {
          const timeItems: MenuProps["items"] = selectedDateData.freeTimes.map(
            (time, i) => ({
              key: `time-${i}-${time}`,
              label: (
                <div
                  style={{ cursor: "pointer", padding: "8px 12px" }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectTime(time);
                  }}
                >
                  {time}
                </div>
              ),
            }),
          );
          setItems(timeItems);
        }
      } catch (error) {
        console.log(error, "Ошибка при подгрузке свободных времен!");
      }
    };

    if (selectedUserDate) {
      fetchAllTimes();
    }
  }, [selectedUserDate, selectTime]);

  const handleSubmit = async () => {
    const isFormValid = activeButton(
      firstname,
      lastname,
      patronymic,
      selectedTime,
      phone,
      validEmail,
    );
    if (isFormValid) {
      try {
        await createRecord(
          selectedUserDate,
          selectedTime,
          firstname,
          lastname,
          patronymic,
          phone,
          email,
        );

        const updatedCalendar = calendar.map((day) => {
          if (day.date === selectedUserDate) {
            const newFreeTimes = day.freeTimes.filter(
              (time) => time !== selectedTime,
            );
            const newBusyTimes = [...day.busyTimes, { time: selectedTime }];
            return {
              ...day,
              freeTimes: newFreeTimes,
              busyTimes: newBusyTimes,
            };
          }
          return day;
        });

        saveNewCalendar(updatedCalendar);
      } catch (error) {
        console.error("Error processing record:", error);
      }
    } else {
      console.log("Form not valid");
    }
  };

  return (
    <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
      <div className={styles.record__modal__title}>
        <span>Выберите время</span>
        <span>|</span>
        <span
          className={
            activeButton(
              firstname,
              lastname,
              patronymic,
              selectedTime,
              phone,
              validEmail,
            )
              ? `${styles.status} ${styles.valid}`
              : `${styles.status} ${styles.invalid}`
          }
        >
          {activeButton(
            firstname,
            lastname,
            patronymic,
            selectedTime,
            phone,
            validEmail,
          )
            ? "Отлично"
            : `Заполните поля.`}
        </span>
      </div>

      <div className={styles.record__modal__body}>
        <div className={styles.left__record__container}>
          <Dropdown trigger={["click"]} menu={{ items }} destroyPopupOnHide className={styles.dropdown}>
            <Button>{selectedTime || "Выберите время"}</Button>
          </Dropdown>
          <input
            placeholder="email"
            className={`${styles.email__input} ${!validEmail && email.length > 0 ? styles.invalid : ""}`}
            type="email"
            value={email}
            onChange={changeEmail}
          />
          <PhoneInput
            inputClass={styles.phone__input}
            containerClass={styles.phone__container}
            searchClass={styles.phone__search}
            value={phone}
            country={"ru"}
            onChange={checkPhoneFunction}
            inputProps={{
              style: {
                width: "100%",
                height: "60px",
                borderColor: "transparent",
                borderRadius: "20px",
                background: `linear-gradient(
                  145deg,
                  rgba(255, 255, 255, 0.18),
                 rgba(255, 255, 255, 0.08)
               )`,
                transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
                color: 'white', fontSize: '1.1rem',
                border: "2px solid rgba(255, 255, 255, 0.3)",
                margin: '0',
                paddingLeft: '20px'
              },
            }}
          />
        </div>
        <div className={styles.right__record__container}>
          <div className={styles.user__dto__fields}>
            <input
              type="text"
              placeholder="Фамилия"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Имя"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Отчество"
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className={`${styles.record__time__btn} ${activeButton(firstname, lastname, patronymic, selectedTime, phone, validEmail) ? "" : styles.disabled}`}
        onClick={handleSubmit}
      >
        Записаться
      </button>
    </div>
  );
};

export default UserModal;
