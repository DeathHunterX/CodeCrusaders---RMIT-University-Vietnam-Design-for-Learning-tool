import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Navbar/navBar';

const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const pathNamePart = pathname.split('/')

  const isLoginPage = pathNamePart[1] === 'login';
  const isRegisterPage = pathNamePart[1] === 'register';
  const isPlannerPage = pathNamePart[1] === 'courses' && (pathNamePart.length > 3 && pathNamePart[3] === 'planner');
  const isCoursePlanner = pathNamePart[1] === 'courses'

  const [isNavBarOpen, setIsNavBarOpen] = useState(true);

  const getPaddingLeft = () => {
    if (isLoginPage || isRegisterPage) {
      return 0;
    }
    
    if (isPlannerPage || (isCoursePlanner && !!pathNamePart[2])) {
      return 0;
    }

    return isNavBarOpen ? (isPlannerPage ? 0 : 4.375) : 11
  };

  const getLeftPosition = () => {
    if (isNavBarOpen) {
      if (isPlannerPage || (isCoursePlanner && !!pathNamePart[2])) {
        return -180;
      }
    }

    return 0;
  }

  const verticalNavBarStyle = {
    left: `${getLeftPosition()}px`,
  };


  const mainStyle = {
    paddingLeft: `${getPaddingLeft()}rem`,
  };

  return (
    <div>
      {!isLoginPage && !isRegisterPage && 
        <NavBar isNavBarOpen={isNavBarOpen} setNavBarOpen={setIsNavBarOpen} setLocationStyle={verticalNavBarStyle}/>
      }
        <div id="mainScreen" style={mainStyle}>
            {children}
        </div>

    </div>
  );
};

export default Layout;