import { useState, useEffect, useRef } from 'react';
import DotsNavigation from './DotNavigation';
import styles from './ImagePreview.module.css';
import noImage from '@assets/projectPage/noImage.webp';
import imageLeft from '@assets/projectPage/imageLeft.webp';
import imageRight from '@assets/projectPage/imageRight.webp';
import deleteIcon from '@assets/projectPage/deleteIcon.webp';
import imageUpload from '@assets/projectPage/imageUpload.webp';

function EditImagePreview({ images, onDeleteClick, onImageUpload }) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (!imageRef.current) {
      console.error('imageRef가 올바르게 연결되지 않았습니다.');
    }
  }, []); // 렌더링 후 `ref`가 연결되었는지 확인

  const setImageRef = (e) => {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.click(); //  `null` 체크 후 실행
    } else {
      console.error('imageRef is not assigned to input element');
    }
  };

  function handleImage(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(selectedFile);

      // 새로 추가된 이미지의 미리보기만 설정
      setPreviewUrl(previewUrl);

      // 상위 컴포넌트에 전달할 때는 파일만 전달
      onImageUpload({ file: selectedFile, previewUrl });
      setCurrentImage(images.length);
    }
  }

  const handleDotClick = (index) => {
    setCurrentImage(index); // 점 클릭 시 해당 이미지로 이동
  };

  return (
    <>
      <div className={styles.imagePreviewContainer}>
        {images.length > 0 ? (
          <>
            <img
              src={imageLeft}
              alt='Previous'
              className={styles.arrowLeft}
              onClick={() => setCurrentImage((prev) => Math.max(prev - 1, 0))} // 이전 이미지로 이동
            />
            <div className={styles.imageWrapper}>
              <img
                src={
                  previewUrl && currentImage === images.length - 1
                    ? previewUrl // 새로 추가한 파일 미리보기
                    : `${import.meta.env.VITE_APP_API_URL}/${images[currentImage]}` // 기존 서버 이미지
                }
                alt={`Preview ${currentImage + 1}`}
                className={styles.imagePreview}
              />
              <input
                id='image'
                ref={imageRef}
                onChange={handleImage}
                type='file'
                accept='.jpg,.png,.jpeg'
                className='hidden'
              />
              <img
                src={deleteIcon}
                alt='Delete'
                className={styles.deleteIconOnImage}
                onClick={() => {
                  onDeleteClick(currentImage);
                  images.splice(currentImage, 1); // 삭제 후 배열 업데이트
                  setCurrentImage((prev) => Math.max(prev - 1, 0)); // 삭제 후 이전 이미지로 이동
                }}
              />
            </div>
            <img
              src={imageRight}
              alt='Next'
              className={styles.arrowRight}
              onClick={() => setCurrentImage((prev) => Math.min(prev + 1, images.length - 1))} // 다음 이미지로 이동
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
      {images.length > 0 ? (
        <DotsNavigation
          totalDots={images.length} // 이미지 수에 따라 점 개수 설정
          activeIndex={currentImage} // 현재 활성화된 이미지 인덱스
          onDotClick={handleDotClick} // 점 클릭 시 동작
        />
      ) : null}
      <button
        onClick={setImageRef}
        className={styles.imageUploadButton}
      >
        <span className={styles.uploadText}>이미지 첨부</span>
        <img
          src={imageUpload}
          alt='Upload Icon'
          className={styles.uploadIcon}
        />
      </button>
    </>
  );
}

export default EditImagePreview;
