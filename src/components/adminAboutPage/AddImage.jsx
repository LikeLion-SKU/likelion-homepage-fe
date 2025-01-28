import { useRef, useState, useEffect } from 'react';
import styles from './registration.module.css';

export default function AddImage({ index, onImageUpload, isStorage, initialImage }) {
  const [fileData, setFileData] = useState({ url: '', name: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImage) {
      setFileData({ url: initialImage, name: initialImage.split('/').pop() });
    }
  }, [initialImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileData({ url, name: file.name });
      onImageUpload(url, index); // index와 url 함께 전달
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
    onImageUpload(null, index); // 이미지 제거 시 빈 문자열과 index 전달
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
            {fileData.name}
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
