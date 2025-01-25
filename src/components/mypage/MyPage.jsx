import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyPage.module.css';
import defaultImg from '@assets/mypage/defaultImg.webp';
import editImg from '@assets/mypage/editImg.webp';

export default function MyPage({ children }) {
  return <section className={styles.section}>{children}</section>;
}

function MyPageProfile({ children }) {
  return <div className={styles.profile}>{children}</div>;
}

function MyPageText() {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
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

function MyPageImage() {
  const [imagesrc, setImagesrc] = useState(defaultImg);
  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagesrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.imageContainer}>
      {/* 프로필 이미지 표시 */}
      <div>
        <img
          src={imagesrc}
          alt='profile'
          className={styles.image}
        />
      </div>

      {/* 이미지 업로드 버튼 */}
      <button className={styles.editButton}>
        <label htmlFor='file-input'>
          <img
            src={editImg}
            alt='edit profile'
          />
        </label>
      </button>

      {/* 파일 선택 */}
      <input
        type='file'
        accept='image/*'
        id='file-input'
        onChange={handleImgChange}
        style={{ display: 'none' }}
      />
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
      onClick={() => navigate('/application')}
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
// MyPage.Title = MyPageTitle;
MyPage.Text = MyPageText;
MyPage.Image = MyPageImage;
MyPage.ItemBox = MyPageItemBox;
MyPage.Apply = MyPageApply;
MyPage.ChangePW = MypageChangePW;
MyPage.Logout = MyPageLogout;
