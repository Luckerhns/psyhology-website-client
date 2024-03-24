import { Select, Typography } from "antd";
import { monthsRuList } from "../../utils/data";
import styles from "../../styles/components/CustomCalendar.module.scss";

const CalendarHeaderComponent = ({
  value,
  type,
  onChange,
  onTypeChange,
  weekDay,
  day,
  monthsList,
  currentYear,
  forAdmin
}: any) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];
  let current = value.clone();
  const localeData: any = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current = current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let i = start; i < end; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {monthsRuList[i]}
      </Select.Option>
    );
  }

  const year = new Date().getFullYear();
  const month = value.month();

  return (
    <div style={{ padding: 8 }} className={styles.calendar__header__container}>
      <div className={styles.date__container}>
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Выберите дату
        </Typography.Title>
        <div className={styles.selected__date__container}>
          <div className={styles.date__year}>{year}</div>
          <Select
            size="small"
            popupMatchSelectWidth={false}
            value={monthsRuList[month]}
            onChange={(newMonth) => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </div>
      </div>
      <div className={styles.current__date}>
        <div className={styles.days__container}>
          <span>{weekDay}</span>
          <span>{day}</span>
          <span>{monthsList}</span>
          <span>{currentYear}</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeaderComponent;
