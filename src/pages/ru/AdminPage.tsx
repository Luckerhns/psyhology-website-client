import React from "react";
import MainLayout from "../../Layout/MainLayout";
import CustomCalendar from "../../components/CustomCalendar";

const AdminPage = () => {
  return (
    <MainLayout>
      <CustomCalendar forAdmin={true} />
    </MainLayout>
  );
};

export default AdminPage;
