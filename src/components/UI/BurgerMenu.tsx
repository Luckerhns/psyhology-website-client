import React, { FC } from "react";
import styles from "../../styles/UI/Burger.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Burger from "./Burger";
import { PublicRoutesEnum } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";

const BurgerMenu: FC = () => {
  const { isBurgerOpen } = useTypedSelector((state) => state.burger);
  const { openModal, setLightTheme, setDarkTheme, SetBurgerClose } =
    useActions();
  const navigate = useNavigate();

  const openPage = (route: string, toProfile?: boolean) => {
    if (toProfile) {
      if (localStorage.getItem("isAdmin")) {
        setDarkTheme();
        setTimeout(() => {
          navigate(PublicRoutesEnum.AdminPath);
          setLightTheme();
        }, 1000);
      } else {
        openModal();
      }
    } else {
      setDarkTheme();
      SetBurgerClose();
      setTimeout(() => {
        navigate(route);
        setLightTheme();
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
          <a onClick={() => openPage(PublicRoutesEnum.MainPath)}>Главная</a>
          <a onClick={() => openPage(PublicRoutesEnum.AboutMePath)}>Обо мне</a>
          <a onClick={() => openPage(PublicRoutesEnum.TherapyPath)}>
            Консультация и терапия
          </a>
          <a>Семейная терапия</a>
          <a>Материалы</a>
          {Boolean(localStorage.getItem("isAdmin")) ? (
            <a onClick={() => openPage(PublicRoutesEnum.AdminPath, true)}>
              Профиль
            </a>
          ) : (
            <a>О главном</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
