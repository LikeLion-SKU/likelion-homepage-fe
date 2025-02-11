import styles from './passPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConsentCheckboxes from './ConsentCheckboxes';
import WelcomeSection from './interview/component/WelcomeSection';
import InterviewScheduler from './interview/component/InterviewScheduler';

const API_URL = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 제출 상태 확인 요청 함수
function getSubmissionStatus() {
  return axiosInstance.get('/api/applications/answers/my-submits/passed');
}

export default function PassPage() {
  const [consents, setConsents] = useState({
    feeConsent: false,
    attendanceConsent: false,
  });
  const isAllConsentsChecked = consents.feeConsent && consents.attendanceConsent;
  const navigate = useNavigate();

  useEffect(() => {
    // 제출 상태 확인
    getSubmissionStatus()
      .then((response) => {
        if (!response.data.isPassed) {
          navigate('/not-allowed'); // isPassed가 false이면 not-allowed로 리디렉트
        }
      })
      .catch((error) => {
        console.error('API 요청 실패:', error);
        navigate('/error'); // 에러 발생 시 /error 페이지로 리디렉트
      });
  }, [navigate]);

  return (
    <div className={styles.allContainer}>
      {/** 안내 문구 */}
      <WelcomeSection />
      {/** 참석 동의 같은거 */}
      <ConsentCheckboxes
        consents={consents}
        onConsentsChange={setConsents}
      />
      {/** 시간 정하는거 */}
      <InterviewScheduler isSubmitEnabled={isAllConsentsChecked} />
    </div>
  );
}
