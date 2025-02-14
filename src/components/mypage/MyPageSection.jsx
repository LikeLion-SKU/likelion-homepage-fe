import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIService } from '@api/axios';
import ProfileImage from './ProfileImage';
import ProfileText from './ProfileText';
import Navigation from './Navigation';
import styles from './MyPage.module.css';

export default function MyPageSection() {
  const [userData, setUserData] = useState({
    username: '',
    useremail: '',
    userimage: '',
    semester: '',
    studentId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/error', {
        state: {
          msg: '로그인이 필요한 서비스입니다.',
          msg2: '로그인 후 다시 이용해주세요.',
          msg3: '이용에 불편을 드려 죄송합니다.',
          btnMsg: '로그인',
          url: '/login',
        },
      });
      return;
    }

    const fetchUserData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_APP_GET_USERINFO;
        const response = await APIService.private.get(baseUrl);

        setUserData({
          username: response.userName,
          useremail: response.loginId,
          userimage: `${import.meta.env.VITE_APP_API_URL}${response.profileImageUrl}`,
          semester: response.semester,
          studentId: response.studentId,
        });
      } catch {
        alert('사용자 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <section className={styles.section}>
      <div className={styles.profile}>
        <ProfileText
          username={userData.username}
          useremail={userData.useremail}
        />
        <ProfileImage
          userimage={userData.userimage}
          semester={userData.semester}
          studentId={userData.studentId}
        />
      </div>
      <Navigation />
    </section>
  );
}
