import React, { FC } from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Body from "../components/Body";
import AuthModal from "../components/AuthModal";
import Background from "../components/UI/Background";
import CalendarModal from "../components/Calendar/CalendarModal";
import BurgerMenu from "../components/UI/BurgerMenu";
import { ILayout } from "../types/types";
import { Helmet } from "react-helmet";
import ScrollToTop from "../components/UI/ScrollToTop";

const MainLayout: FC<ILayout> = ({ children, title, metaContent }) => {
  return (
    <>
      <Helmet>
        <title>{title && title}</title>
      </Helmet>
      <Navbar />
      <Body>{children}</Body>
      <Footer />
      <Background />
      <CalendarModal />
      <BurgerMenu />
      <ScrollToTop />
    </>
  );
};

export default MainLayout;
