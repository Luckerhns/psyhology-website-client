import React from "react";
import Slider from "react-slick";
import styles from "../../styles/UI/Slider.module.scss";

const SliderComponent = ({ carousel }: { carousel: any[] }) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className={styles.slider__image__container}>
      <Slider {...settings}>
        {carousel.map((e: { id: number; src: string }) => (
          <div className={styles.padding} key={e.id}>
            <img className={styles.slider__image} src={e.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
