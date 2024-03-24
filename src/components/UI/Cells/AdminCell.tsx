import React, { FC } from "react";
import styles from "../../../styles/components/CustomCalendar.module.scss";
import { useActions } from "../../../hooks/useActions";
import {
  CalendarData,
  IAdminCell,
  ICalendarData,
} from "../../../types/Calendar";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { findCurrentDate } from "../../../utils/functions";

const AdminCell: FC<IAdminCell> = ({
  selectedRecordField,
  eventDate,
  openRecordModal,
  events,
  selectedCellDate,
}) => {
  const { selectedUserDate } = useTypedSelector((state) => state.recordModal);
  const currentDate: any[] = findCurrentDate(events, selectedUserDate);
  return (
    <div
      className={styles.admin__cell}
      onClick={() => {
        openRecordModal(true, selectedCellDate, true);
        console.log(selectedCellDate);
      }}
    >
      <div className={styles.cell__content}>
        <span>На этот день занятых записей {eventDate?.busyTimes?.length}</span>
        <div className={styles.admin__btn__container}>
          <div
            style={{ opacity: selectedRecordField ? 1 : 0 }}
            className={styles.admin__btn}
            onClick={
              selectedRecordField
                ? () => {
                    openRecordModal(false, selectedCellDate, false);
                  }
                : () => console.log(eventDate)
            }
          >
            редактировать
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCell;
