import React from "react";
import styles from "../../styles/MainPage.module.scss";
import basket from "../../assets/nav-icons/basket.png";
import favorite from "../../assets/nav-icons/favorite.png";
import notFavorite from "../../assets/nav-icons/heart.png";
import image from "../../assets/image.png";

const GoodCard = () => {
  return (
    <div className={styles.good__item}>
      <img src={notFavorite} className={styles.favorites__icon} />
      <img src={image} alt="" className={styles.item__image} />
      <div className={styles.item__description}>
        <div className={styles.name}>Title</div>
        <div className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, earum!
        </div>
        <div className={styles.amount}>
          В наличии / <span>350 штук</span>
        </div>
      </div>
      <div className={styles.item__buy__button}>
        <div className={styles.button}>
          <img src={basket} />
          <div className={styles.buy__button}>В корзину</div>
        </div>
      </div>
    </div>
  );
};

export default GoodCard;
