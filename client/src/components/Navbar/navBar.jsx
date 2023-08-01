import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import { BiLogOut, BiBell } from "react-icons/bi";

import Logo from "../../images/Logo/RMIT-logo.jpg";

import { NavBarData } from "./navBarData";

import AvatarImg from "../../images/Avatar/avatar.jpg";
import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../redux/slices/authSlice";

const NavBar = ({ isNavBarOpen, setNavBarOpen }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  // const { user } = useSelector(state => state.auth)
  // console.log(user)
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(reset());
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && (
        <>
          <nav
            className={`navbar navbar-vertical navbar-light navbar-expand-xl ${
              isNavBarOpen === true ? "navbar-close" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <button
                className="btn btn-default btn-circle-hover me-2"
                onClick={() => setNavBarOpen((state) => !state)}
              >
                <RxHamburgerMenu />
              </button>
              <Link to={"/"}>
                <img src={Logo} alt="rmit" style={{ width: "150px" }} />
              </Link>
            </div>
            <div
              className="navbar-vertical-content navbar-collapse collapse"
              id="navbarVerticalCollapse"
            >
              <div className="navbar-top-content">
                <ul className="navbar-nav flex-column mb-3">
                  {NavBarData.map((items, idx) => (
                    <li className="nav-item" key={idx}>
                      <Link to={items.path}>
                        <span className="nav-icon">{items.icon}</span>
                        <span className="nav-text ms-3">{items.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="navbar-bottom-content">
                <ul className="navbar-nav flex-column mb-4">
                  <li className="nav-item">
                    {" "}
                    <hr />
                  </li>
                  <li
                    className="nav-item"
                    style={{ cursor: "pointer" }}
                    onClick={logOut}
                  >
                    <span className="nav-icon">
                      <BiLogOut />
                    </span>
                    <span className="nav-text ms-3">Log out</span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="navbar top-navbar">
            <ul className="navbar-right navbar-nav flex-row me-3">
              <li className="nav-item px-2">
                <Link to={"/"}>
                  <span className="nav-icon">
                    <BiBell />
                  </span>
                </Link>
              </li>

              <li className="nav-item px-2 dropdown">
                <div
                  className="d-flex"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="nav-link">
                    <Avatar src={AvatarImg} size="medium-avatar" />
                  </span>
                  <div className="d-block ms-3">
                    <small>Active</small>
                    <p>Phan Ngan</p>
                  </div>
                </div>
                <div
                  className="dropdown-menu avatar-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to={`/user/01/profile`}>
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to={`/user/01/setting/`}>
                    Settings
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
