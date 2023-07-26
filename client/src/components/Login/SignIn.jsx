import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../../redux/slices/authSlice";
import { usePreventAccess } from "../../hook/usePreventAccess";

const SignIn = () => {
  const SignInState = {
    username: "Phanngan811",
    password: "Phanngan811!",
  };
  const [loginData, setLoginData] = useState(SignInState);
  const { username, password } = loginData;

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginData((state) => ({ ...state, [name]: value }));
  };

  usePreventAccess();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch, message]);

  if (isLoading) {
  }

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUser(loginData));
  };

  return (
    <div className="login_center">
      <div className="login_inner-center">
        <div className="left"></div>
        <div className="container">
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <h5 className="heading-form">Sign into your account</h5>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="RMIT or Personal username"
                required
                onChange={handleChangeInput}
              />

              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                required
                onChange={handleChangeInput}
              />

              <button type="submit">Sign In</button>
            </form>
            <div className="middle">
              <p className="account">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
              <Link to="/">Forgot your Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
