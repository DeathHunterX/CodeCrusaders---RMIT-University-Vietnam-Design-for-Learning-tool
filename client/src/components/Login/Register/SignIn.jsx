import React from "react";
import classes from "../../../styles/components/Login/Login.module.css";

const SignIn = () => {
  return (
    <div className={classes["center"]}>
      <div className={classes["inner-center"]}>
        <div className={classes["left"]}></div>
        <div className={classes["container"]}>
          <div className={classes["login-form"]}>
            <form action="">
              <h5 className={classes["heading-form"]}>
                Sign into your account
              </h5>
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
              <div className={classes["middle"]}>
                <p className={classes["account"]}>
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
