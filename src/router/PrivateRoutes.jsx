import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { APIService } from '@/api/axios';

export default function PrivateRoute({ children }) {
  const [userRole, setuserRole] = useState('');

    useEffect(() => {
      async function fetchUserRole() {
        try {
          const baseUrl = import.meta.env.VITE_APP_GET_ROLE;
          const response = await APIService.private.get(baseUrl);
          setuserRole(response.data);
        } catch (error) {
          console.error('접근 권한이 없습니다', error);
          location.href = '/error';
        }
      }
  
      fetchUserRole();
    }, []);

  if (userRole !== 'admin') {
    // 인증 실패 시
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}