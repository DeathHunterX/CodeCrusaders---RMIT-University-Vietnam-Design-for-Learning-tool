import { Outlet, Navigate, useLocation } from 'react-router-dom'

const PrivateRouter = () => {
    const firstLogin = localStorage.getItem('token')
    const location = useLocation();

    return firstLogin 
    ?  
    <Outlet /> : 
    <Navigate to="/login" state={{from: location}} replace="true" />
}

export default PrivateRouter