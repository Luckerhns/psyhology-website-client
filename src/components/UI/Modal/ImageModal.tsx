import React, { useEffect } from 'react';
import styles from '../../../styles/UI/Modal/ImageModal.module.scss'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';

const ImageModal = () => {
  const {closeImageModal} = useActions();
  const {isActive, image} = useTypedSelector(state => state.imageModal)

  useEffect(() => {
    isActive ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
  }, [isActive])

  return (
    <div className={isActive ? `${styles.imageModalContainer} ${styles.active}` : styles.imageModalContainer} onClick={closeImageModal}>
      <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
        <img src={image} />
      </div>
    </div>
  );
};

export default ImageModal;