import { useEffect } from 'react';
import { APIService } from './axios';

export function useGetApplicants(setApplicants) {
  useEffect(() => {
    async function fetchApplicants() {
      try {
        const baseUrl = import.meta.env.VITE_APP_POST_ANSWER;
        const res = await APIService.private.get(`${baseUrl}/semester/${14}`);
        setApplicants(res);
      } catch (error) {
        console.error(error);
        alert('지원자 목록을 받아오는 데 실패했습니다.');
      }
    }

    fetchApplicants();
  }, [setApplicants]);
}

export async function assignPassed(formAnswerId, isPassed) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_ANSWER + `/${formAnswerId}/passed`;
    const res = await APIService.private.put(baseUrl, {
      isPassed,
    });
    return res;
  } catch (error) {
    console.error(error);
    alert('변경하는 데 실패했습니다.');
  }
}
