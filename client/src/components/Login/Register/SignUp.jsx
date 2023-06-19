import React from "react";
import classes from "../../../styles/components/Register/Register.module.css";

const SignUp = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["inner-container"]}>
        <div className={classes["left-side"]}></div>
        <div className={classes["right-side"]}>
          <h3 className={classes["heading"]}>Create an account</h3>
          <p className={classes["login"]}>
            Already have an account? <a href={"/login"}>Log in</a>
          </p>

          <div className={classes["signUp-form"]}>
            <form action="">
              <input
                type="email"
                name="email"
                placeholder="RMIT or email address"
                required
              />
              <div className={classes["name"]}>
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  required
                />
                <div className={classes["space"]}></div>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className={classes["password"]}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <div className={classes["space"]}></div>
                <input
                  type="password"
                  name="conPassword"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <p className={classes["privacy"]}>
                By creating an account, you agree to our{" "}
                <a href="http://">Terms of use</a> and{" "}
                <a href="">Privacy Policy</a>
              </p>
              <button type="submit">Create an account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
