import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import styles from "../../styles/Therapy.module.scss";
import { therapyPageType } from "../../utils/therapyType";
import { ITherapySecondContent } from "../../types/therapyPage";

const TherapyPage = () => {
  const type: string = localStorage.getItem("consultation") || "psycho";
  useEffect(() => {
    if (type === null) {
      localStorage.setItem("consultation", "psycho");
      console.log(type);
    }
  }, []);
  return (
    <MainLayout>
      <div className={styles.title__container}>
        <div className={styles.left__heading}>
          <h4 className={styles.title__heading}>
            {/* @ts-ignore */}
            {therapyPageType[type].title}
          </h4>
          {/* @ts-ignore */}
          <div className={styles.title__content}>
            {therapyPageType[type].title_content_1}
            <br />
            <br />
            <br />
            {therapyPageType[type].title_content_2}
          </div>
          <div className={styles.record__btn}>Записаться</div>
        </div>
        <div className={styles.right__heading}>
          <img src={therapyPageType[type].title_image} alt={"Картинка"} />
        </div>
      </div>

      <div className={styles.therapyPage__description}>
        {therapyPageType[type].content.map((obj: ITherapySecondContent) => (
          <div className={styles.therapyPage__content}>
            <div className={styles.therapyPage__content__heading}>
              <h3>{obj.heading}</h3>
              <div className={styles.line}></div>
            </div>
            <div className={styles.therapyPage__content__body}>
              <div className={styles.text}>{obj.heading_content}</div>
              <i className={styles.list_heading}>
                {obj.list_heading && obj.list_heading}
              </i>
              <ul className={obj.list ? styles.list : ""}>
                {obj.list
                  ? obj.list.map((item) => (
                      <li className={styles.list__item}>{item}</li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TherapyPage;
