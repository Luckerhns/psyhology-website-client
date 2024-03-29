import React, { useEffect, useState } from "react";
import styles from "../../styles/UI/ScrollToTop.module.scss";
import arrowTop from '../../icons/arrowTop.png'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <div
      className={styles.scrollTo}
      style={isVisible ? { opacity: 1, zIndex: "10000" } : { opacity: 0, zIndex: '-100' } }
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <img src={arrowTop} />
    </div>
  );
};

export default ScrollToTop;
