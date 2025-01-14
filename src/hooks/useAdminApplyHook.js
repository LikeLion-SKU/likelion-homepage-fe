import { getApplicants } from '@api/adminApplyAPI';
import { useEffect } from 'react';

export function useGetApplicants(setApplicants) {
  useEffect(() => {
    getApplicants(setApplicants);
  }, [setApplicants]);
}
