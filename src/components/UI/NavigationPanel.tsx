import React from 'react';
import styles from '../../styles/UI/Navigation.module.scss'

const arr = ["снюс", "ашка", "сигареты", "табак", "курилка", "курилка"]

const NavigationPanel = () => {
    return (
        <div className={styles.panel__container} style={{height: arr.length * 60 + 50}}>
            <h3 className={styles.panel__title}>Каталог</h3>
            {arr.map(e => (
                <div key={e} className={styles.panel__category}>
                    <span className={styles.category__name}>{e}</span>
                </div>
            ))}
        </div>
    );
};

export default NavigationPanel;