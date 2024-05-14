import Login from '../components/login';
import Register from '../components/register';
import Profile from '../components/profile';
import UserList from '../components/user-list';
import PageNotFound from '../components/page-not-found';
import { RoutePaths } from '../constants';
import WelcomePage from '../components/welcome-page';

export const routes = {
  public: [
    {
      path: RoutePaths.HOME,
      element: <WelcomePage />
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ],
  public_only: [
    {
      path: RoutePaths.REGISTER,
      element: <Register />
    },
    {
      path: RoutePaths.LOGIN,
      element: <Login />
    }
  ],
  private: [
    {
      path: RoutePaths.PROFILE,
      element: <Profile />
    },
    {
      path: RoutePaths.USER_LIST,
      element: <UserList />
    }
  ]
};
