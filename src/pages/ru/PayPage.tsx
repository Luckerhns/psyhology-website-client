import React from "react";
import styles from "../../styles/PayPage.module.scss";

const PayPage = () => {
  return (
    <div className={styles.payPageContainer}>
      <form
        className={styles.payformTinkoff}
        name="payformTinkoff"
        // onsubmit="pay(this); return false;"
        id="payformTinkoff"
      >
        <input
          className={styles.payformTinkoffRow}
          type="hidden"
          name="terminalkey"
          value="TinkoffBankTest"
        />
        <input
          className={styles.payformTinkoffRow}
          type="hidden"
          name="frame"
          value="false"
        />
        <input
          className={styles.payformTinkoffRow}
          type="hidden"
          name="language"
          value="ru"
        />
        <input
          className={styles.payformTinkoffRow}
          type="text"
          placeholder="Сумма заказа"
          name="amount"
          required
        />
        <input
          className={styles.payformTinkoffRow}
          type="hidden"
          placeholder="Номер заказа"
          name="order"
        />
        <input
          className={styles.payformTinkoffRow}
          type="text"
          placeholder="Описание заказа"
          name="description"
        />
        <input
          className={styles.payformTinkoffRow}
          type="text"
          placeholder="ФИО плательщика"
          name="name"
        />
        <input
          className={styles.payformTinkoffRow}
          type="email"
          placeholder="E-mail"
          name="email"
        />
        <input
          className={styles.payformTinkoffRow}
          type="tel"
          placeholder="Контактный телефон"
          name="phone"
        />
        <input
          className={styles.payformTinkoffRow }
          type="submit"
          value="Оплатить"
        />
      </form>
    </div>
  );
};

export default PayPage;
