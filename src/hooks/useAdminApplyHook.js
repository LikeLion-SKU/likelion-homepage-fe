import { getAnswers, getApplicants, getUserInfos } from '@api/adminApplyAPI';
import { useEffect } from 'react';

export function useGetApplicants(setApplicants, semester) {
  useEffect(() => {
    getApplicants(setApplicants, semester);
  }, [semester, setApplicants]);
}

export function useGetQandA(setCommonQA, setPartQA, studentId) {
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getAnswers(studentId, setCommonQA, setPartQA);

      // 배열을 필터링하여 분류
      const commonAnswers = res.commonAnswers;
      const partAnswers = res.trackAnswers;

      setCommonQA(commonAnswers);
      setPartQA(partAnswers);
    };

    fetchUserInfo();
  }, [setCommonQA, setPartQA, studentId]);
}

export function useGetUserInfo(setUserInfos, studentId) {
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfos(studentId);
      const newUserInfo = {
        이름: userInfo.userName,
        학과: userInfo.department,
        학번: userInfo.studentId,
        전화번호: userInfo.phoneNumber,
        이메일: userInfo.loginId + '@skuniv.ac.kr',
      };
      setUserInfos(newUserInfo);
    };
    fetchUserInfo();
  }, [setUserInfos, studentId]);
}
