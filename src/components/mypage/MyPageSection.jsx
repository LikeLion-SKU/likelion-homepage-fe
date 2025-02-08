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
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다:', error);
      navigate('/error');
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/error');
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
