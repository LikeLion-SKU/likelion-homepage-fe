import { useState, useRef } from 'react';
import styles from './ImagePreview.module.css';
import noImage from '@assets/projectPage/noImage.webp';
import imageLeft from '@assets/projectPage/imageLeft.webp';
import imageRight from '@assets/projectPage/imageRight.webp';
import deleteIcon from '@assets/projectPage/deleteIcon.webp';

function ImagePreview({ images, currentImage, onPrevClick, onNextClick, isAdmin, onDeleteClick }) {
  const isSingleImage = images.length === 1;
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);

  // 터치 시작 시 좌표 저장
  function handleTouchStart(e) {
    setStartX(e.touches[0].clientX);
  }

  // 터치 종료 시 이동 방향에 따라 이미지 변경
  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentImage < images.length - 1) {
        onNextClick();
      } else if (diffX < 0 && currentImage > 0) {
        onPrevClick();
      }
    }
  }

  return (
    <div
      className={styles.imagePreviewContainer}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.length > 0 ? (
        <>
          {!isSingleImage && currentImage > 0 ? (
            <img
              src={imageLeft}
              alt='Previous'
              className={styles.arrowLeft}
              onClick={onPrevClick}
            />
          ) : null}
          <div className={styles.imageWrapper}>
            <img
              src={images[currentImage]}
              alt={`Preview ${currentImage + 1}`}
              className={styles.imagePreview}
            />
            {isAdmin ? (
              <img
                src={deleteIcon}
                alt='Delete'
                className={styles.deleteIconOnImage}
                onClick={function () {
                  onDeleteClick(currentImage);
                }}
              />
            ) : null}
          </div>
          {!isSingleImage && currentImage < images.length - 1 ? (
            <img
              src={imageRight}
              alt='Next'
              className={styles.arrowRight}
              onClick={onNextClick}
            />
          ) : null}
        </>
      ) : (
        <div className={styles.noImageContainer}>
          <img
            src={noImage}
            alt='No Image'
            className={styles.noImageIcon}
          />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
