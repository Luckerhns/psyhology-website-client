import React, { useEffect } from "react";
import styles from "../../styles/RecordPage.module.scss";
import MainLayout from "../../Layout/MainLayout";
import CustomCalendar from "../../components/CustomCalendar";

const RecordPage = () => {
  return (
    <MainLayout title="Запись на приём | Татьяная Ëремина">
      <CustomCalendar withHeader={true} />
    </MainLayout>
  );
};

export default RecordPage;
