import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {getRefreshToken} from './CookieSetUp'

const InactivityLogout = ({children}) => {
    let timer;

    const expiredTime = 4 * 60 * 60 * 1000;
    const events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress",
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutTimer = () => {
        if (localStorage.getItem("userInfo")){
            timer = setTimeout(() => {
                resetTimer();
                Object.values(events).forEach((item) => {
                    window.removeEventListener(item, resetTimer);
                });

                logoutAction();
            }, expiredTime);
        }
    };

    const resetTimer = () => {
        if (timer) clearTimeout(timer);
    };

    useEffect(() => {
        Object.values(events).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer();
                handleLogoutTimer();
            });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const checkRefreshToken = getRefreshToken()

        if (!checkRefreshToken) {
            dispatch(logoutUser());
            navigate('/login');
        }
    }, [dispatch, navigate])

    const logoutAction = () => {
        alert('User is logged out due to inactivity.');
        dispatch(logoutUser());
        navigate('/login');
    };
        
    return children;
};

export default InactivityLogout;