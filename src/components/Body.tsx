import React from 'react';
import styles from '../styles/Body.module.scss'
import { useActions } from '../hooks/useActions';

const Body = ({children}: any) => {
  const {SetBurgerClose} = useActions()
    return (
        <div onClick={() => SetBurgerClose()} className={styles.body__container}>
            {children}
        </div>
    );
};

export default Body;