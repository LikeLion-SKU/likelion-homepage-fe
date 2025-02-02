import styles from './ImagePreview.module.css';
import noImage from '@assets/projectPage/noImage.webp';
import imageLeft from '@assets/projectPage/imageLeft.webp';
import imageRight from '@assets/projectPage/imageRight.webp';

function DetailPreview({ images, currentImage, onPrevClick, onNextClick }) {
  const isSingleImage = images.length === 1;

  return (
    <div className={styles.imagePreviewContainer}>
      {images.length > 0 ? (
        <>
          {!isSingleImage ? (
            <img
              src={imageLeft}
              alt='Previous'
              className={styles.arrowLeft}
              onClick={onPrevClick}
            />
          ) : null}
          <img
            src={images[currentImage]}
            alt={`Preview ${currentImage + 1}`}
            className={styles.imagePreview}
          />
          {!isSingleImage ? (
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

export default DetailPreview;
