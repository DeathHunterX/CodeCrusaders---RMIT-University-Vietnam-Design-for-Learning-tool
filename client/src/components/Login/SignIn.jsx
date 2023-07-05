import React from "react";

const SignIn = () => {
  return (
    <div className="login_center">
      <div className="login_inner-center">
        <div className="left"></div>
        <div className="container">
          <div className="login-form">
            <form action="">
              <h5 className="heading-form">Sign into your account</h5>
              <input
                type="text"
                name="email"
                placeholder="RMIT or email address"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />

              <button type="submit">Sign In</button>
              <div className="middle">
                <p className="account">
                  Don't have an account? <a href={"/register"}>Register here</a>
                </p>
                <a href="url">Forgot your Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
