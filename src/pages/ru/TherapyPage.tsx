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

  const [scrolled, setScrolled] = useState(false);
  const [updownScroll, setUpdownScroll] = useState(false);

  useEffect(() => {
    setUpdownScroll(true);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <MainLayout>
      <div className={styles.title__container}>
        <div
          style={{
            transform: updownScroll ? "translateY(0)" : "translateY(-100vh)",
          }}
          className={styles.left__heading}
        >
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
        {therapyPageType[type].content.map((obj: ITherapySecondContent, key: number) => (
          <div className={styles.therapyPage__content} key={key}>
            <div className={styles.therapyPage__content__heading}>
              <h3
                style={{
                  transform: scrolled
                    ? "scale(1.3) translate(0)"
                    : "scale(1) translate(-100vw)",
                }}
              >
                {obj.heading}
              </h3>
              <div className={styles.line}></div>
            </div>
            <div
              style={{
                transform: scrolled ? "scale(1)" : "scale(0.5)",
              }}
              className={styles.therapyPage__content__body}
            >
              <div className={styles.text}>{obj.heading_content}</div>
              <i className={styles.list_heading}>
                {obj.list_heading && obj.list_heading}
              </i>
              <ul className={obj.list ? styles.list : ""}>
                {obj.list
                  ? obj.list.map((item, i) => (
                      <li key={i} className={styles.list__item}>
                        {item}
                      </li>
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
