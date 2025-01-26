import { APIService } from '@api/axios';
import { useState, useEffect } from 'react';
import MyPage from './MyPage';
import defaultImg from '@assets/mypage/defaultImg.webp';

export default function MyPageSection() {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userimage, setUserimage] = useState(defaultImg);
  const [semester, setSemester] = useState('');
  const [studentId, setStudentId] = useState('');

  async function fetchUserData() {
    try {
      const baseUrl = import.meta.env.VITE_APP_GET_USERINFO;
      const response = await APIService.private.get(baseUrl);
      setUsername(response.userName);
      setUseremail(response.loginId);
      setUserimage(response.profileImageUrl);
      setSemester(response.semester);
      setStudentId(response.studentId);
      console.log(response.profileImageUrl);
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다:', error);
      location.href = '/error';
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

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
          setUserimage={setUserimage}
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
