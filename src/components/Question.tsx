import React, { FC, useState } from "react";
import styles from "../styles/UI/Question.module.scss";
import { IQuestion } from "../types/Question";
import close from "../icons/close.png";

const Question: FC<IQuestion> = ({ title, body }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div
      style={{ maxHeight: opened ? 700 : 20}}
      onClick={() => setOpened(!opened)}
      className={styles.question}
    >
      <div className={styles.question__head__title}>
        <span>{title}</span>
        <span>
          <img style={{transform: opened ? "rotate(90deg)" : "rotate(45deg)"}} src={close} />
        </span>
      </div>
      <div className={styles.question__body__text}>{body}</div>
    </div>
  );
};

export default Question;
