import { useRef, useState, useEffect } from 'react';
import styles from './registration.module.css';

export default function AddImage({ index, onImageUpload, isStorage, initialImage }) {
  const [fileData, setFileData] = useState({ url: '', name: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImage) {
      // initialImage가 문자열일 때만 split을 실행
      if (typeof initialImage === 'string') {
        setFileData({ url: initialImage, name: initialImage.split('/').pop() });
      } else {
        // 이미지 객체가 전달된 경우 처리 (예: URL.createObjectURL로 변환)
        setFileData({ url: URL.createObjectURL(initialImage), name: initialImage.name });
      }
    }
  }, [initialImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileData({
        url: URL.createObjectURL(file), // file의 URL 생성
        name: file.name,
      });
      onImageUpload(file, index);
    }
  };

  const handleFileNameClick = () => {
    if (isStorage) return;
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택 창 열기
    }
  };

  const handleRemoveFile = () => {
    setFileData({ url: '', name: '' });
    onImageUpload(null, index); // 이미지 제거 시 빈 값 전달
  };

  return (
    <div className={styles.container}>
      {fileData.name && (
        <div className={styles.fileNameContainer}>
          <p
            className={styles.fileName}
            onClick={handleFileNameClick}
            style={{ cursor: isStorage ? 'default' : 'pointer', textDecoration: 'underline' }}
          >
            {fileData.name} {/* fileData.name을 렌더링 */}
          </p>
          {!isStorage && (
            <button
              className={styles.removeButton}
              onClick={handleRemoveFile}
            >
              X
            </button>
          )}
        </div>
      )}

      {!fileData.name && !isStorage && (
        <label
          htmlFor={`fileUpload-${index}`}
          className={styles.uploadButton}
        >
          이미지 선택
        </label>
      )}

      <input
        id={`fileUpload-${index}`}
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className={styles.hiddenInput}
        disabled={isStorage}
      />
    </div>
  );
}
