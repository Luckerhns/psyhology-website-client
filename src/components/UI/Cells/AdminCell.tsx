import React, { FC, useState } from "react";
import styles from "../../../styles/components/CustomCalendar.module.scss";
import {
  ICalendarData,
} from "../../../types/Calendar";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { findCurrentDate } from "../../../utils/functions";
import dayjs, {Dayjs} from "dayjs";

const AdminCell: FC<{
  selectedRecordField: boolean;
  eventDate?: ICalendarData;
  openRecordModal: any;
  events?: any;
  selectedCellDate?: string;
  isDateExists?: boolean;
}> = ({
  selectedRecordField,
  eventDate,
  openRecordModal,
  events,
  selectedCellDate,
  isDateExists,
}) => {
  const { selectedUserDate } = useTypedSelector((state) => state.recordModal);
  const currentDate: any[] = findCurrentDate(events, selectedUserDate);
  const [todayDate, setTodayDate] = useState(() =>
    dayjs(
      `${new Date().getFullYear()}-${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    ).format("YYYY-MM-DD")
  );
  return (
    <div className={styles.admin__cell}>
      <div className={styles.cell__content}>
        <span>
          {eventDate?.freeTimes?.length
            ? `На этот день свободных записей : ${eventDate.freeTimes.length}`
            : "На этот день нету записей"}
        </span>

          <div className={styles.admin__btn__container}>
            <div
              style={{ opacity: selectedRecordField ? 1 : 0 }}
              className={styles.admin__btn}
              onClick={
                selectedRecordField
                  ? () => {
                      openRecordModal(false, selectedCellDate, true);
                    }
                  : () => console.log(eventDate?.busyTimes.length)
              }
            >
              `Записаться`
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminCell;
