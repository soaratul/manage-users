import { useEffect } from 'react';
import Layout from '../layout';
import { BrowserRouter as Router } from 'react-router-dom';
import ServerNotRunning from '../app-essential';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../store/user/actions';
import { checkIfBackendServiceRunning } from '../../store/backend-service/actions';
import { getAdderssList } from '../../store/address/actions';

function App() {
  const dispatch = useDispatch();

  const backendServiceStatus = useSelector(
    (state) => state.backendService.status
  );

  useEffect(() => {
    dispatch(checkIfBackendServiceRunning());
    dispatch(getMe());
    dispatch(getAdderssList());
  }, []);

  if (backendServiceStatus === 'INACTIVE') return <ServerNotRunning />;

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
