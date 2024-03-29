import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.scss";
import { useActions } from "../hooks/useActions";
import {
  PrivateNavbarRoutesArray,
  PrivateRoutesEnum,
  PublicNavbarRoutesArray,
  PublicRoutesEnum,
} from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ReactFlagsSelect from "react-flags-select";
import { Switch } from "@mui/material";
import { themes } from "../utils/colors";
import Burger from "../components/UI/Burger";

const Navbar = () => {
  const { openModal, setLightTheme, setDarkTheme, CloseBurger } = useActions();
  const navigate = useNavigate();

  const openPage = (
    route: string,
    toProfile?: boolean,
    therapyType?: string
  ) => {
    if (therapyType) {
      localStorage.removeItem("consultation");
      localStorage.setItem("consultation", therapyType);
    }
    if (toProfile) {
      if (localStorage.getItem("isAdmin")) {
        setDarkTheme();
        setTimeout(() => {
          navigate(PrivateRoutesEnum.CurrentRecords);
          setLightTheme();
          window.location.reload();
        }, 1000);
      } else {
        openModal();
      }
    } else {
      setDarkTheme();
      setTimeout(() => {
        navigate(route);
        setLightTheme();
        window.location.reload();
      }, 1000);
    }
  };

  const { theme } = useTypedSelector((state) => state.theme);
  const [flag, setFlag] = useState("RU");
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <header className={styles.header__container}>
      <div className={styles.header}>
        <div className={styles.second__header}>
          <div className={styles.second__grid}>
            <span className={styles.header__logo__text}>
              Магистр психологии, психотерапевт, семейный психолог
            </span>
            <Link
              className={styles.header__logo}
              to={PublicRoutesEnum.MainPath}
            >
              Татьяна Ерёмина
            </Link>
            <Burger isBurger={true} />
          </div>
        </div>
        <div className={styles.main__header}>
          <div className={styles.header__container}>
            {!isAdmin
              ? PublicNavbarRoutesArray.map((route, i) => (
                  <a
                    key={i}
                    onClick={() =>
                      openPage(route.path, route.toProfile, route.therapyType)
                    }
                  >
                    {route.pathName}
                  </a>
                ))
              : PrivateNavbarRoutesArray.map((route, i) => (
                  <a
                    key={i}
                    onClick={() =>
                      openPage(route.path, route.toProfile, route.therapyType)
                    }
                  >
                    {route.pathName}
                  </a>
                ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
