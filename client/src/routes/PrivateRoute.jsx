import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/login' }} state={{ from: pathname }} />
  );
};

export default PrivateRoute;
