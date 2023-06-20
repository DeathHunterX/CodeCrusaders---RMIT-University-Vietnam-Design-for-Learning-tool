import React from 'react'

const SignUp = () => {
    return (
        <div className="register_container">
            <div className="register_inner-container">
                <div className="left-side"></div>
                <div className="right-side">
                    <h3 className="heading">Create an account</h3>
                    <p className="login">
                        Already have an account? <a href={"/login"}>Log in</a>
                    </p>

                    <div className="signUp-form">
                    <form action="">
                        <input
                        type="email"
                        name="email"
                        placeholder="RMIT or email address"
                        required
                        />
                        <div className="name">
                        <input
                            type="text"
                            name="fname"
                            placeholder="First Name"
                            required
                        />
                        <div className="space"></div>
                        <input
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                            required
                        />
                        </div>
                        <div className="password">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <div className="space"></div>
                        <input
                            type="password"
                            name="conPassword"
                            placeholder="Confirm Password"
                            required
                        />
                        </div>
                        <p className="privacy">
                        By creating an account, you agree to our{" "}
                        <a href="http://">Terms of use</a> and{" "}
                        <a href="/">Privacy Policy</a>
                        </p>
                        <button type="submit">Create an account</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SignUp