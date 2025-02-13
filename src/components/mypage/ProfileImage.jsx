// components/MyPage/ProfileImage.jsx
import useImageUpload from '@hooks/useImageUpload';
import styles from './MyPage.module.css';
import editImg from '@assets/mypage/editImg.webp';

export default function ProfileImage({ userimage, semester, studentId }) {
  const { previewUrl, imageRef, handleImageSelect, handleImageUpload } = useImageUpload(userimage, semester, studentId);

  const handleSubmit = async () => {
    try {
      await handleImageUpload();
      alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      alert(error.message);
      if (error.message.includes('오류가 발생')) {
        location.href = '/error';
      }
    }
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={previewUrl || userimage}
          alt={previewUrl ? '미리보기' : 'profile'}
          className={styles.image}
        />
        <button
          className={styles.editButton}
          onClick={() => imageRef.current?.click()}
          type='button'
          aria-label='프로필 이미지 변경'
        >
          <img
            src={editImg}
            alt='edit profile'
            className={styles.editIcon}
          />
        </button>
      </div>

      <input
        type='file'
        accept='image/*'
        id='file-input'
        className={styles.hiddenInput}
        ref={imageRef}
        onChange={handleImageSelect}
        aria-hidden='true'
      />

      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        type='button'
      >
        저장
      </button>
    </div>
  );
}
