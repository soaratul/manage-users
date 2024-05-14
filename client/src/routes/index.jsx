import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import PublicRoute from './PublicRoute';
import { routes } from './routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        {routes.public.map((route, index) => (
          <Route key={`key-${index}`} {...route} />
        ))}
      </Route>
      <Route element={<PublicOnlyRoute />}>
        {routes.public_only.map((route, index) => (
          <Route key={`key-${index}`} {...route} />
        ))}
      </Route>
      <Route element={<PrivateRoute />}>
        {routes.private.map((route, index) => (
          <Route key={`key-${index}`} {...route} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
