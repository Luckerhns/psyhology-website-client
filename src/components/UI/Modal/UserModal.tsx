import React, { ChangeEvent, useEffect, useState } from "react";
import { activeButton, checkEmail } from "../../../utils/functions";
import { Button, Dropdown, MenuProps } from "antd";
import PhoneInput from "react-phone-input-2";
import styles from "../../../styles/UI/CalendarModal.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Link } from "react-router-dom";
import { PublicRoutesEnum } from "../../../utils/consts";

const UserModal = () => {
  const items: MenuProps["items"] = [];

  const { allTimes, selectedUserDate, selectedTime } = useTypedSelector(
    (state) => state.recordModal
  );

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidEmail(checkEmail(email));
    console.log(validEmail, "VALID");
  };

  const checkPhoneFunction = (e: string) => {
    setPhone(e);
    if (phone.length >= 11) {
      setAccessForm(true);
    } else {
      setAccessForm(false);
    }
  };

  useEffect(() => {
    allTimes[0] &&
      //@ts-ignore
      allTimes[0].map((el, i) => {
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

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const [accessForm, setAccessForm] = useState(Boolean);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [phone, setPhone] = useState("");

  const { setSelectedTime, createRecord } = useActions();

  return (
    <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
      <div className={styles.record__modal__title}>
        <span>Выберите время</span>
        <span>|</span>
        <span>
          {!activeButton(
            firstname,
            lastname,
            patronymic,
            selectedTime,
            phone,
            validEmail
          )
            ? "Заполните поля"
            : "Отлично"}
        </span>
      </div>
      <div className={styles.record__modal__body}>
        <div className={styles.left__record__container}>
          <Dropdown trigger={["click"]} menu={{ items: items }}>
            <Button>{selectedTime}</Button>
          </Dropdown>
          <input
            placeholder="email"
            className={styles.email__input}
            style={{ border: validEmail ? "" : "2px solid red" }}
            type="text"
            value={email}
            onChange={(e) => changeEmail(e)}
          />
          <PhoneInput
            value={phone}
            country={"ru"}
            onChange={(e: any) => checkPhoneFunction(e)}
            inputStyle={{ width: "100%", marginLeft: 20 }}
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
      <Link
        className={
          !accessForm
            ? styles.record__time__btn
            : `${styles.record__time__btn} ${styles.disabled}`
        }
        onClick={
          !activeButton(
            firstname,
            lastname,
            patronymic,
            selectedTime,
            phone,
            validEmail
          )
            ? () => {}
            : () => {}
        }
        to={PublicRoutesEnum.PayPath}
      >
        Перейти к оплате
      </Link>
    </div>
  );
};

export default UserModal;
