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
  const [startX, setStartX] = useState(0);

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
      alert('imageRef가 올바르게 연결되지 않았습니다.');
    }
  }, []); // 렌더링 후 `ref`가 연결되었는지 확인

  function setImageRef(e) {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.click();
    } else {
      alert('이미지를 업로드할 input 요소가 올바르게 설정되지 않았습니다.');
    }
  }

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

  function handleDotClick(index) {
    setCurrentImage(index); // 점 클릭 시 해당 이미지로 이동
  }

  // 터치 시작 시 X 좌표 저장
  function handleTouchStart(e) {
    setStartX(e.touches[0].clientX);
  }

  // 터치 종료 시 이동 방향에 따라 이미지 변경
  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentImage < images.length - 1) {
        setCurrentImage((prev) => prev + 1);
      } else if (diffX < 0 && currentImage > 0) {
        setCurrentImage((prev) => prev - 1);
      }
    }
  }

  return (
    <>
      <div
        className={styles.imagePreviewContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 0 ? (
          <>
            {currentImage > 0 && images.length > 1 ? (
              <img
                src={imageLeft}
                alt='Previous'
                className={styles.arrowLeft}
                onClick={function () {
                  setCurrentImage(function (prev) {
                    return Math.max(prev - 1, 0);
                  });
                }}
              />
            ) : null}
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
                onClick={function () {
                  onDeleteClick(currentImage);
                  images.splice(currentImage, 1); // 삭제 후 배열 업데이트
                  setCurrentImage(function (prev) {
                    return Math.max(prev - 1, 0);
                  }); // 삭제 후 이전 이미지로 이동
                }}
              />
            </div>
            {currentImage < images.length - 1 && images.length > 1 ? (
              <img
                src={imageRight}
                alt='Next'
                className={styles.arrowRight}
                onClick={function () {
                  setCurrentImage(function (prev) {
                    return Math.min(prev + 1, images.length - 1);
                  });
                }} // 다음 이미지로 이동
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
