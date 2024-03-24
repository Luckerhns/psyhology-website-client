import React from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Body from "../components/Body";
import AuthModal from "../components/AuthModal";
import Background from "../components/UI/Background";
import CalendarModal from "../components/Calendar/CalendarModal";
import BurgerMenu from "../components/UI/BurgerMenu";

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <Body>{children}</Body>
      <Footer />
      <Background />
      <CalendarModal />
      <BurgerMenu />
    </>
  );
};

export default MainLayout;
