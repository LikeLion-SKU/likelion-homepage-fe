import { useState, useEffect, useRef } from 'react';
import { APIService } from '@api/axios';
import { useNavigate } from 'react-router-dom';
import styles from './MyPage.module.css';
import editImg from '@assets/mypage/editImg.webp';

export default function MyPage({ children }) {
  return <section className={styles.section}>{children}</section>;
}

function MyPageProfile({ children }) {
  return <div className={styles.profile}>{children}</div>;
}

function MyPageText({ username, useremail }) {
  return (
    <div className={styles.textContainer}>
      <p className={styles.title}>
        {username}님 <br />
        안녕하세요
      </p>
      <p className={styles.text}>{useremail}</p>
    </div>
  );
}

function MyPageImage({ userimage, semester, studentId }) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isVaild, setIsVaild] = useState(false);

  const imageRef = useRef();

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

  function setImageRef(e) {
    e.preventDefault();
    imageRef.current.click();
  }

  function handleImage(event) {
    let selectedFile = event.target.files[0];
    let fileIsValid = isVaild;

    if (event.target.files || event.target.files.length === 1) {
      setFile(selectedFile);
      setIsVaild(true);
      fileIsValid = true;
    } else {
      setIsVaild(false);
      fileIsValid = false;
    }
  }

  console.log(previewUrl);

  const handleImgSubmit = async () => {
    if (!file) {
      alert('업로드할 이미지를 선택하세요.');
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_APP_PUT_IMAGE;
      const params = new URLSearchParams({ semester, studentId });
      const urlWithParams = `${baseUrl}?${params}`;
      console.log(urlWithParams);

      const formData = new FormData();
      formData.append('image', file);

      const response = await APIService.private.put(urlWithParams, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success === true) {
        alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
      } else {
        alert('이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      location.href = '/error';
    }
  };

  return (
    <div className={styles.imageContainer}>
      <div>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt='미리보기'
            className={styles.image}
          />
        ) : (
          <img
            src={userimage}
            alt='profile'
            className={styles.image}
          />
        )}
      </div>

      <button
        className={styles.editButton}
        onChange={setImageRef}
      >
        <label htmlFor='file-input'>
          <img
            src={editImg}
            alt='edit profile'
          />
        </label>
      </button>

      <input
        type='file'
        accept='image/*'
        id='file-input'
        style={{ display: 'none' }}
        ref={imageRef}
        onChange={handleImage}
      />

      <button
        className={styles.submitButton}
        onClick={handleImgSubmit}
      >
        저장
      </button>
    </div>
  );
}

function MyPageItemBox({ children }) {
  return <div className={styles.itembox}>{children}</div>;
}

function MyPageApply() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.itembox__button}
      onClick={() => navigate('/application')}
    >
      내 지원서 보러가기
    </button>
  );
}

function MypageChangePW() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.itembox__button}
      onClick={() => navigate('/passwordChange')}
    >
      비밀번호 변경
    </button>
  );
}

function MyPageLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <button
      className={styles.itembox__button}
      onClick={handleLogout}
    >
      {' '}
      로그아웃
    </button>
  );
}

MyPage.Profile = MyPageProfile;
MyPage.Text = MyPageText;
MyPage.Image = MyPageImage;
MyPage.ItemBox = MyPageItemBox;
MyPage.Apply = MyPageApply;
MyPage.ChangePW = MypageChangePW;
MyPage.Logout = MyPageLogout;
