import React, { FC } from "react";
import styles from "../../styles/Navbar.module.scss";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IBurger {
  isBurger?: boolean;
}

const Burger: FC<IBurger> = ({ isBurger }) => {
  const { SetBurgerOpen, SetBurgerClose } = useActions();
  const { isBurgerOpen } = useTypedSelector((state) => state.burger);
  return isBurger ? (
    <div
      className={styles.header__burger}
      onClick={isBurgerOpen ? () => SetBurgerClose() : () => SetBurgerOpen()}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  ) : (
    <div
      className={styles.header__close}
      onClick={isBurgerOpen ? () => SetBurgerClose() : () => SetBurgerOpen()}
    >
      X
    </div>
  );
};

export default Burger;
