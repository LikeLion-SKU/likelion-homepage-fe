import { useState } from 'react';
import styles from './registration.module.css';

export default function AddImage({ onImageUpload, isStorage }) {
  const [fileName, setFileName] = useState(''); // 파일명 상태
  const [isFileSelected, setIsFileSelected] = useState(false); // 파일이 선택되었는지 여부 상태

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 파일명 상태 업데이트
      setIsFileSelected(true); // 파일 선택되었음을 표시
      const url = URL.createObjectURL(file); // URL 생성
      onImageUpload({ url, name: file.name }); // URL과 파일명 함께 전달
    }
  };

  const handleFileNameClick = () => {
    if (isStorage) return; // isStorage가 true일 때는 클릭하지 않도록 막기

    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.click(); // 파일 선택 창 열기
    } else {
      console.error('파일 입력 요소를 찾을 수 없습니다.');
    }
  };

  const handleRemoveFile = () => {
    setFileName(''); // 파일명 초기화
    setIsFileSelected(false); // 파일 선택 상태 초기화
    onImageUpload({ url: '', name: '' });

    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className={styles.container}>
      {!isFileSelected && !isStorage && (
        <label
          htmlFor='fileUpload'
          className={styles.uploadButton}
        >
          이미지 선택
        </label>
      )}

      <input
        id='fileUpload'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className={styles.hiddenInput}
        disabled={isStorage}
      />

      {fileName && (
        <div className={styles.fileNameContainer}>
          <p
            className={styles.fileName}
            onClick={handleFileNameClick}
          >
            {fileName}
          </p>
          <button
            className={styles.removeButton}
            onClick={handleRemoveFile}
            disabled={isStorage}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
