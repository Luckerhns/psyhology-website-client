import React, { useState } from "react";
import Slider from "react-slick";
import styles from "../../styles/UI/Slider.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const SliderComponent = ({ carousel }: { carousel: any[] }) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const { isActive, image } = useTypedSelector((state) => state.imageModal);
  const { openImageModal } = useActions();

  return (
    <div className={styles.slider__image__container}>
      <Slider {...settings}>
        {carousel.map((e: { id: number; src: string }) => (
          <div
            className={styles.padding}
            key={e.id}
            onClick={() => {
              openImageModal(e.src, true);
              console.log(isActive, image)
            }}
          >
            <img className={styles.slider__image} src={e.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
