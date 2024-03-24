import React from 'react';
import styles from "../../../styles/components/CustomCalendar.module.scss";

const BusyTimesCell = () => {
  return (
    <div
    className={`${styles.record__cell} ${styles.disabled__cell}`}
  >
    <div className={styles.cell__content}>
      занято
    </div>
  </div>
  );
};

export default BusyTimesCell;