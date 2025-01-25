import styles from './ImagePreview.module.css';
import noImage from '@assets/projectPage/noImage.webp';
import imageLeft from '@assets/projectPage/imageLeft.webp';
import imageRight from '@assets/projectPage/imageRight.webp';

function ImagePreview({ images, currentImage, onPrevClick, onNextClick }) {
  return (
    <div className={styles.imagePreviewContainer}>
      {images.length > 0 ? (
        <>
          <img
            src={imageLeft}
            alt='Previous'
            className={styles.arrowLeft}
            onClick={onPrevClick}
          />
          <img
            src={images[currentImage]}
            alt={`Preview ${currentImage + 1}`}
            className={styles.imagePreview}
          />
          <img
            src={imageRight}
            alt='Next'
            className={styles.arrowRight}
            onClick={onNextClick}
          />
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
