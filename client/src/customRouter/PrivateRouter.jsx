import { Outlet, Navigate } from 'react-router-dom';
import { getRefreshToken } from '../utils/CookieSetUp';

const PrivateRouter = () => {
    const firstLogin = getRefreshToken();    // Access website by refresh token
    return firstLogin ?  <Outlet /> : <Navigate to="/login" replace="true" />;
};

export default PrivateRouter;