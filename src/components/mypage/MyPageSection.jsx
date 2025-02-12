import { APIService } from '@api/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPage from './MyPage';

export default function MyPageSection() {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userimage, setUserimage] = useState('');
  const [semester, setSemester] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  async function fetchUserData() {
    try {
      const baseUrl = import.meta.env.VITE_APP_GET_USERINFO;
      const response = await APIService.private.get(baseUrl);
      setUsername(response.userName);
      setUseremail(response.loginId);
      setUserimage(`${import.meta.env.VITE_APP_API_URL}${response.profileImageUrl}`);
      setSemester(response.semester);
      setStudentId(response.studentId);
    } catch {
      alert('사용자 정보를 불러오는데 실패했습니다.');
    }
  }

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
    fetchUserData();
  });

  return (
    <MyPage>
      <MyPage.Profile>
        <MyPage.Text
          username={username}
          useremail={useremail}
        />
        <MyPage.Image
          userimage={userimage}
          semester={semester}
          studentId={studentId}
        />
      </MyPage.Profile>
      <MyPage.ItemBox>
        <MyPage.Apply />
        <MyPage.ChangePW />
        <MyPage.Logout />
      </MyPage.ItemBox>
    </MyPage>
  );
}
