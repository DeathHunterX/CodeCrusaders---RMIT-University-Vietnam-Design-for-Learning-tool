import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {RxHamburgerMenu} from 'react-icons/rx'

import {BiLogOut} from 'react-icons/bi'

import Logo from '../../images/Logo/RMIT-logo.jpg'

import { NavBarData } from './navBarData'

import AvatarImg from '../../images/Avatar/avatar.jpg'
import Avatar from '../Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser} from '../../redux/slices/authSlice'


const NavBar = ({isNavBarOpen, setNavBarOpen, setLocationStyle}) => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logOutUser());
  }

  const {pathname} = useLocation();
  const pathNamePart = pathname.split('/');
 
  return (
    <>
    {(pathNamePart[1] !== "login" && pathNamePart[1] !== "register") && (
      <React.Fragment> 
        <nav className={`navbar navbar-vertical navbar-light navbar-expand-xl ${isNavBarOpen === true ? 'navbar-close' : ''}`}
        style={setLocationStyle}>
            <div className="sideBar-spacer"></div>
            <div className="navbar-vertical-content navbar-collapse collapse" id="navbarVerticalCollapse">
              <div className="navbar-top-content">
                <ul className='navbar-nav flex-column mb-3'>
                  {
                    NavBarData.map((items, idx) => (
                      <li className={`nav-item ${`/${pathNamePart[1]}` === items.path && "active"}`} key={idx}>
                        <Link to={items.path}> 
                          <span className='nav-icon'>{items.icon}</span> 
                          <span className='nav-text ms-3'>{items.title}</span>
                        </Link>
                      </li>
                    ))
                  }
                  
                </ul>
              </div>

              <div className="navbar-bottom-content">
                <ul className='navbar-nav flex-column mb-4'>
                  <li> <hr /></li>
                  <li className='nav-item' style={{cursor: 'pointer'}} onClick={logOut}>
                      <span className='nav-icon'><BiLogOut/></span>
                      <span className='nav-text ms-3'>Log out</span>
                  </li>
                </ul>
              </div>
            </div> 
        </nav>

        <div className="navbar top-navbar">
          <div className="container-fluid">
            <div className="navbar-left d-flex align-items-center">
              <span className='btn btn-default btn-circle-hover me-1' onClick={() => setNavBarOpen(state => !state)}>
                <RxHamburgerMenu />
              </span>
              <Link to="/">
                <img src={Logo} alt="rmit" style={{width:"150px"}}/>
              </Link> 
            </div>
            <ul className="navbar-right navbar-nav flex-row me-3">
              <li className="nav-item px-2 dropdown">
                <div className="d-flex" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="nav-link" >
                      <Avatar src={AvatarImg} size="medium-avatar"/>
                  </span>
                </div>
                <div className="dropdown-menu avatar-menu" aria-labelledby="navbarDropdown">
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex justify-content-center">
                      <Avatar src={AvatarImg} size="medium-avatar"/>
                    </div>
                    <p className="text-center mt-1">{user?.name}</p>
                  </div>
                  <hr />
                  <Link className="dropdown-item" to={`/user/01/profile`} >My Profile</Link>
                  <Link className="dropdown-item" to={`/user/01/setting/`} >Settings</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )}
    </>

  )
}

export default NavBar