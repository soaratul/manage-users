import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { REDIRECT_AFTER_LOGIN } from '../constants/redirects';
import { useSelector } from 'react-redux';

const PublicOnlyRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoggedIn) {
    const redirectAfterLogin = location?.state?.from || REDIRECT_AFTER_LOGIN;
    return <Navigate to={{ pathname: redirectAfterLogin }} />;
  }
  return <Outlet />;
};

export default PublicOnlyRoute;
