import { getAnswers, getApplicants, getSemesters, getUserInfos } from '@api/adminApplyAPI';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useGetApplicants(setApplicants, semester) {
  useEffect(() => {
    getApplicants(setApplicants, semester);
  }, [semester, setApplicants]);
}

export function useGetQandA(setCommonQA, setPartQA, id) {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getAnswers(id, navigate);

      // 배열을 필터링하여 분류
      const commonAnswers = res.commonAnswers;
      const partAnswers = res.partAnswers;

      setCommonQA(commonAnswers);
      setPartQA(partAnswers);
    };

    fetchUserInfo();
  }, [setCommonQA, setPartQA, id, navigate]);
}

export function useGetUserInfo(setUserInfos, formId) {
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfos(formId);
      const newUserInfo = {
        이름: userInfo.userName,
        학과: userInfo.department,
        학번: userInfo.studentId,
        전화번호: userInfo.phoneNumber,
        이메일: userInfo.loginId,
      };
      setUserInfos(newUserInfo);
    };
    fetchUserInfo();
  }, [setUserInfos, formId]);
}

export function useGetSemesters(setYears) {
  useEffect(() => {
    async function fetchSemester() {
      const data = await getSemesters();
      setYears(data);
    }

    fetchSemester();
  }, [setYears]);
}
