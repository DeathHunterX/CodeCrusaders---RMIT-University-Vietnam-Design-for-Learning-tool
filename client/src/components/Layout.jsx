import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Navbar/navBar';

const Layout = ({ children, isNavBarOpen, setNavBarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';

  const getPaddingLeft = () => {
    if (isLoginPage || isRegisterPage) {
      return 0;
    }
   
    return isNavBarOpen ? 4.375 : 11;
  };


  const mainStyle = {
    paddingLeft: `${getPaddingLeft()}rem`,
  };

  return (
    <div>
      {!isLoginPage && !isRegisterPage && <NavBar isNavBarOpen={isNavBarOpen} setNavBarOpen={setNavBarOpen}/>}
      
        <div id="mainScreen" style={mainStyle}>
            {children}
        </div>

    </div>
  );
};

export default Layout;