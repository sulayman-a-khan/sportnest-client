import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullPage={true} />;
  }

  if (!user) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Support both nested Layout routing (standard Outlet) and wrapped children
  return children ? children : <Outlet />;
};

export default PrivateRoute;
