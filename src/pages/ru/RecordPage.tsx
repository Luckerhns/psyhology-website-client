import React, { useState } from "react";
import styles from "../../styles/RecordPage.module.scss";
import MainLayout from "../../Layout/MainLayout";
import CustomCalendar from "../../components/CustomCalendar";

const RecordPage = () => {
  return (
    <MainLayout>
      <CustomCalendar withHeader={true} />
    </MainLayout>
  );
};

export default RecordPage;
