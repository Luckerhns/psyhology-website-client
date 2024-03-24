import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminRecords.module.scss";
import MainLayout from "../../Layout/MainLayout";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { busyRecords } from "../../utils/data";
import { getBusyRecords } from "../../http/recordApi";
import { getDateIsActive } from "../../utils/functions";

const AdminRecords = () => {
  const {} = useTypedSelector((state) => state.recordModal);
  const { logOut } = useActions();
  const [record, setRecord] = useState(busyRecords);
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const currentDate = [currentMonth, currentDay];

  useEffect(() => {
    getBusyRecords().then((res) => setRecord(res));
  }, []);

  console.log(currentDate);
  return (
    <MainLayout>
      <div className={styles.admin__records__container}>
        <div className={styles.records__container}>
          {record.map((e) => {
            const startMonth = e.date.indexOf("-");
            const startDay = e.date.lastIndexOf("-");
            const recordDay = parseInt(
              e.date.slice(startDay + 1, startDay + 3)
            );
            const recordMonth = parseInt(
              e.date.slice(startMonth + 1, startMonth + 3)
            );
            const currentRecord = [recordMonth, recordDay];

            const isActive = getDateIsActive(currentDate, currentRecord);

            console.log(isActive);

            return (
              <div data-active={isActive}
                className={
                  isActive ? `${styles.record__active}` : `${styles.record}`
                }
              >
                <div className={styles.record__date}>{e.date}</div>
                <div className={styles.record__time}>{e.time}</div>
                <div className={styles.record__phone}>{e.phone}</div>
                <div className={styles.record__email}>{e.email}</div>
                <div className={styles.record__firstname}>{e.firstname}</div>
                <div className={styles.record__lastname}>{e.lastname}</div>
                <div className={styles.record__patronymic}>{e.patronymic}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.btn__exit} onClick={logOut}>
          Выйти
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminRecords;
