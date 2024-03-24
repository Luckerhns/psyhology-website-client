import React, { FC, useEffect } from "react";
import styles from "../../../styles/components/CustomCalendar.module.scss";
import { useActions } from "../../../hooks/useActions";
import success from "../../../icons/success.png";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { findCurrentDate } from "../../../utils/functions";
import { IFreeTimesCell } from "../../../types/Calendar";

const FreeTimesCell: FC<IFreeTimesCell> = ({ selectedRecordField, events }) => {
  const {
    selectDate,
    setTimes,
    OpenUserModalTimes,
    closeRecordModal,
    setSelectedTime,
  } = useActions();
  const { allTimes, selectedStateDate, selectedUserDate } = useTypedSelector(
    (state) => state.recordModal
  );

  const openUserModal = () => {
    const currentDateAllTimes = findCurrentDate(events, selectedUserDate);
    console.log(currentDateAllTimes);
    OpenUserModalTimes(currentDateAllTimes, selectedUserDate, events);
    setSelectedTime("Выберите время");
  };

  // useEffect(() => {
  //   openUserModal();
  //   closeRecordModal();
  // }, []);

  // Закомментировал UseEffect и вызовы функций, потому что они не работают.

  return (
    <div className={styles.record__cell}>
      <div className={styles.cell__content}>
        <img src={success} />{" "}
        <span className={styles.cell__text}>Есть свободное время</span>
      </div>
      <div
        style={{ opacity: selectedRecordField ? 1 : 0 }}
        className={styles.appoinment__record__btn}
        onClick={selectedRecordField ? () => openUserModal() : () => {}}
      >
        Записаться
      </div>
    </div>
  );
};

export default FreeTimesCell;
