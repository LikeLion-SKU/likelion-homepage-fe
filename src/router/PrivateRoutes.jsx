import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'admin') {
    // 인증 실패 시
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}