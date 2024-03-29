import React, { useEffect } from 'react';
import styles from '../styles/Body.module.scss'
import { useActions } from '../hooks/useActions';

const Body = ({children}: any) => {
  const {SetBurgerClose} = useActions()
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 400) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    })
  })
    return (
        <div onClick={() => SetBurgerClose()} className={styles.body__container}>
            {children}
        </div>
    );
};

export default Body;