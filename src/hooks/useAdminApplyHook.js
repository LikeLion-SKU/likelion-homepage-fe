import { getApplicants } from '@api/adminApplyAPI';
import { useEffect } from 'react';

export function useGetApplicants(setApplicants, semester) {
  useEffect(() => {
    getApplicants(setApplicants, semester);
  }, [setApplicants, semester]);
}
