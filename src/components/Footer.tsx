import React from "react";
import styles from "../styles/Footer.module.scss";
import { payIcons } from "../utils/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <footer className={styles.footer__container}>
    //   <div className={styles.additionally__footer}>
    //     <div className={styles.store__info}>
    //       © ИП Ерёмина Татьяна {new Date().getFullYear()}
    //     </div>
    //     <div>license</div>
    //   </div>
    //     <div className={styles.warning}>
    //       Медицинские услуги на данном сайте не предлагаются и не оказываются.
    //       Психотерапия на сайте, в том числе в дипломах и сертификатах
    //       специалиста, - это метод/способ психологического консультирования и ни
    //       при каких условиях не может пониматься как вид медицинской (врачебной)
    //       деятельности.
    //     </div>
    // </footer>
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
          &copy; {new Date().getFullYear()} ИП Ëремина Татьяна. Все права
          защищены.
        </div>
        <div className={styles.footerLinks}>
          <Link to="#">Пользовательское соглашение</Link>
          <Link to="#">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
