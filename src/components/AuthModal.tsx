import showpassword from "../icons/show.png";
import hidePassword from "../icons/hide.png";
import React, { FC, useState } from "react";
import styles from "../styles/UI/AuthModal.module.scss";
import "react-phone-input-2/lib/style.css";
import "../styles/Phone.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { PublicRoutesEnum } from "../utils/consts";

const AuthModal: FC = () => {
  const event = [
    {
      date: "2023-01-10",
      username: "dsadsa",
      freeTimes: [],
      busyTimes: [],
      notSelectedTimes: [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
      ],
    },
  ];
  const navigate = useNavigate();
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  const { isOpen } = useTypedSelector((state) => state.modal);
  const { closeModal, openModal, login } = useActions();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [dirtyPassword, setDirtyPassword] = useState(false);
  const [dirtyEmail, setDirtyEmail] = useState(false);

  const [isPassword, setIsPassword] = useState(true);

  const mailExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function checkEmail(e: any) {
    const isCorrect = mailExp.test(String(e).toLowerCase());
    if (!isCorrect) setEmailError("Некорректная почта");
    else setEmailError("");
  }

  const activeButton = passwordError || emailError !== "" ? true : false;

  return (
    <div
      className={
        isOpen
          ? `${styles.main__container_auth} ${styles.active}`
          : styles.main__container_auth
      }
      onClick={(e) => {}}
    >
      <div
        className={
          isOpen ? `${styles.modal__content} ${styles.modal__active}` : ""
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.close}
          onClick={() => {
            closeModal();
            navigate(PublicRoutesEnum.MainPath);
          }}
        >
          x
        </div>
        {/* LOGIN MODAL */}
        <div className={styles.registration__modal}>
          <h3 className={styles.registration__title}>Вход</h3>
          <div className={styles.input__container}>
            <span>Email</span>
            <input
              onBlur={() => checkEmail(email)}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              type="email"
              placeholder="Email"
              className={`${styles.registration__email} registration__input`}
            />
            <div
              className={styles.data__checker}
              style={emailError ? { opacity: 1 } : { opacity: 0 }}
            >
              {emailError}
            </div>
          </div>
          <div className={styles.input__container}>
            <span>Password</span>
            <input
              type={isPassword ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className={`${styles.registration__password} registration__input`}
            />
            <img
              src={!isPassword ? showpassword : hidePassword}
              onClick={() => setIsPassword(!isPassword)}
              className={styles.password__icon}
            />
            <div
              className={styles.data__checker}
              style={passwordError ? { opacity: 1 } : { opacity: 0 }}
            >
              {passwordError}
            </div>
          </div>
          <div className={styles.registration__button_container}>
            <button
              className={styles.registration__button}
              disabled={activeButton}
              onClick={() => login(email, password)}
              style={{
                background: activeButton ? "darkgray" : "",
                transition: ".3s ease-in",
              }}
            >
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
