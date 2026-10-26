import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Logged-in users skip the login/signup pages and go back where they came from.
export default function PublicOnlyRoute() {
  const { user } = useAuth();
  const location = useLocation();
  if (user) return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  return <Outlet />;
}
