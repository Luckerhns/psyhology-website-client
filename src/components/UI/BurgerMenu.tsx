import React, { FC } from "react";
import styles from "../../styles/UI/Burger.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Burger from "./Burger";
import {
  PrivateNavbarRoutesArray,
  PrivateRoutesEnum,
  PublicNavbarRoutesArray,
  PublicRoutesEnum,
} from "../../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import whatsup from "../../icons/whatsapp.png";

const BurgerMenu: FC = () => {
  const { isBurgerOpen } = useTypedSelector((state) => state.burger);
  const { openModal, setLightTheme, setDarkTheme, SetBurgerClose } =
    useActions();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

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

  return (
    <div
      className={
        isBurgerOpen
          ? `${styles.burger__container} ${styles.active}`
          : `${styles.burger__container}`
      }
    >
      <div className={styles.burger__container__content}>
        <div>
          <Burger />
        </div>
        <div className={styles.burger__container__body}>
          {isAdmin
            ? PrivateNavbarRoutesArray.map((route) => (
                <a
                  key={route.pathName}
                  onClick={() =>
                    openPage(route.path, route.toProfile, route.therapyType)
                  }
                >
                  {route.pathName}
                </a>
              ))
            : PublicNavbarRoutesArray.map((route) => (
                <a
                  key={route.pathName}
                  onClick={() =>
                    openPage(route.path, route.toProfile, route.therapyType)
                  }
                >
                  {route.pathName}
                </a>
              ))}
          <Link to={"https:/wa.me/79859555063"}>
            <img src={whatsup} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
