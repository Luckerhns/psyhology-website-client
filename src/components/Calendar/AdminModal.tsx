import React, { useState } from "react";
import styles from "../../styles/UI/CalendarModal.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Button, Dropdown, MenuProps } from "antd";

const recordTypesEnum = [
  "Психология отношений",
  "Проработка травм",
  "Психологическая неустойка",
];

const AdminModal = () => {
  const [selectedTime, setSelectedTime] = useState("Выберите время");
  const [selectedType, setSelectedType] = useState("Выберите консультацию");

  const items: MenuProps["items"] = [];
  const recordType: MenuProps["items"] = [];

  const { isRecordOpen, allTimes } = useTypedSelector(
    (state) => state.recordModal
  );

  recordTypesEnum.map((e, i) => {
    recordType.push({
      key: i,
      label: <div onClick={() => setSelectedType(e)}>{e}</div>,
    });
  });
  allTimes[0] !== undefined &&
  //@ts-ignore
    allTimes[0].map((e, i) =>
      items.push({
        key: i,
        label: <div onClick={() => setSelectedTime(e)}>{e}</div>,
      })
    );

  const { closeRecordModal } = useActions();
  return (
    <div
      className={
        isRecordOpen
          ? `${styles.main__container__time} ${styles.active}`
          : styles.main__container__time
      }
      onClick={closeRecordModal}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.record__modal__title}>
          Выберите время для записи
        </div>
        <div className={styles.record__modal__body}>
          <div className={styles.left__record__container}>
            <Dropdown trigger={["click"]} menu={{ items }}>
              <Button>{selectedTime}</Button>
            </Dropdown>
            <Dropdown trigger={["click"]} menu={{ items: recordType }}>
              <Button>{selectedType}</Button>
            </Dropdown>
          </div>
        </div>
        <div className={styles.record__time__btn}>Записаться</div>
      </div>
    </div>
  );
};

export default AdminModal;
