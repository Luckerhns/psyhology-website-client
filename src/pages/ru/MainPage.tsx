import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import styles from "../../styles/MainPage.module.scss";
import Question from "../../components/Question";
import SliderComponent from "../../components/UI/Slider";
import { rewards } from "../../utils/data";
import { Link } from "react-router-dom";
import { PublicRoutesEnum } from "../../utils/consts";
import avatar_1 from "../../icons/images/avatar_1.png";
import avatar_0 from "../../icons/images/avatar_0.jpeg";

const MainPage = () => {
  return (
    <MainLayout>
      <div className={styles.title__section}>
        <div className={styles.left__container}>
          <h5 className={styles.left__container__title}>Татьяна Ерёмина</h5>
          <div className={styles.left__container__text}>
            <div>
              Гештальт терапевт, психоаналитический психотерапевт, супервизор,
            </div>
            <br />
            <div>
              Готова помочь в решении психологических травм и проблем,
              записывайся уже сейчас!
            </div>
          </div>
          <Link
            to={
              localStorage.getItem("isAdmin")
                ? PublicRoutesEnum.AdminPath
                : PublicRoutesEnum.RecordPath
            }
            className={styles.record__btn}
          >
            Записаться
          </Link>
        </div>
        <div className={styles.right__section}>
          <img src={avatar_0} alt="#" />
        </div>
      </div>

      <div className={styles.about__section}>
        <div className={styles.background__ball} />
        <div className={styles.left__container}>
          <img src={avatar_1} alt="#" />
        </div>
        <div className={styles.right__container}>
          <div className={styles.text}>
            В индивидуальной работе использую психоаналитическую психотерапию и
            гештальт подход. Данные подходы помогает осознать внутренние
            конфликты - причины поведенческих и эмоциональных затруднений.
          </div>
          <div className={styles.text}>
            В работе с парами применяю эмоционально-фокусированную терапию. ЭФТ
            - это современный и активно развивающийся подход в терапии пар,
            ставящий во главу угла создание безопасных эмоциональных связей, или
            надежной привязанности, во взрослых любовных отношениях.
          </div>
        </div>
      </div>

      <div className={styles.questions__section}>
        <h5 className={styles.section__title}>Популярные вопросы</h5>
        <div className={styles.questions__container}>
          <Question title="Как мы решаем проблемы?" body="Все просто!" />
          <Question title="Как мы решаем проблемы?" body="Все просто!" />
          <Question
            title="Как мы решаем проблемы?"
            body="Все просто! dasdasdsa ds adsadsa d addВсе просто! dasdasdsa ds adsadsa d addВсе просто! dasdasdsa ds adsadsa d add"
          />
        </div>
      </div>
      <div className={styles.rewards__section}>
        <h5>Мои дипломы</h5>
        <div className={styles.rewards__container}>
          <SliderComponent carousel={rewards} />
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
