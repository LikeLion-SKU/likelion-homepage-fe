import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { APIService } from '@/api/axios';

export default function PrivateRoute({ children }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const baseUrl = import.meta.env.VITE_APP_GET_ROLE;
        const response = await APIService.private.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.role === 'ADMIN') {
          setUserRole('ADMIN');
        }
      } catch (error) {
        console.error('접근 권한이 없습니다', error);
      }
    }

    fetchUserRole();
  }, []);

  if (userRole === null) {
    return null;
  }

  if (userRole !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
