import React from "react";
import styles from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { PublicRoutesEnum } from "../utils/consts";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footer__notice}>
          Уведомления для пользователей Медицинские услуги на данном сайте не
          предлагаются и не оказываются. Психотерапия на сайте, в том числе в
          дипломах и сертификатах специалиста, - это метод/способ
          психологического консультирования и ни при каких условиях не может
          пониматься как вид медицинской (врачебной) деятельности.
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} ИП Еремина Татьяна. Все права
          защищены.
        </div>
        <div className={styles.footerLinks}>
          <Link to={PublicRoutesEnum.AgreePath}>Пользовательское соглашение</Link>
          <Link to={PublicRoutesEnum.PoliticyPath}>Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
