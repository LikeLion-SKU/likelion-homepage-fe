import { useEffect } from 'react';
import { APIService } from './axios';

export function useGetApplicants(setApplicants) {
  useEffect(() => {
    async function fetchApplicants() {
      try {
        const baseUrl = import.meta.env.VITE_APP_POST_ANSWER;
        const res = await APIService.private.get(`${baseUrl}/semester/${14}`);
        setApplicants(res);
      } catch {
        location.href = '/error';
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
  } catch {
    location.href = '/error';
  }
}
