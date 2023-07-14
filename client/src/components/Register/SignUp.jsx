import React, {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {toast} from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { registerUser, reset } from '../../redux/slices/authSlice'

import { usePreventAccess } from "../../hook/usePreventAccess";


const SignUp = () => {

    const SignUpState = {
        username: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    const [registerData, setRegisterData] = useState(SignUpState)
    const {username, firstName, lastName, password} = registerData

    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    usePreventAccess();

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            toast.success("Your account is successfully created. Please login into your account again to enter website")
            navigate('/login')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, navigate, dispatch, message])

    if(isLoading) {
    
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setRegisterData((state) => ({...state, [name]: value}))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password === confirmPassword) {
            dispatch(registerUser(registerData))
        } else {
            toast.error("Password does not match")
        }


    }

    return (
        <div className="register_container">
            <div className="register_inner-container">
                <div className="left-side"></div>
                <div className="right-side">
                    <h3 className="heading">Create an account</h3>
                    <p className="login">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>

                    <div className="signUp-form">
                    <form onSubmit={handleRegister}>
                        <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="RMIT or Personal Username"
                        required
                        onChange={handleChangeInput}
                        />
                        <div className="name">
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            placeholder="First Name"
                            required
                            onChange={handleChangeInput}
                        />
                        <div className="space"></div>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            placeholder="Last Name"
                            required
                            onChange={handleChangeInput}
                        />
                        </div>
                        <div className="password">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            required
                            onChange={handleChangeInput}
                        />
                        <div className="space"></div>
                        <input
                            type="password"
                            name="conPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        </div>
                        <p className="privacy">
                            By creating an account, you agree to our{" "}
                            <Link to="/">Terms of use</Link> and{" "}
                            <Link to="/">Privacy Policy</Link>
                        </p>
                        <button type='submit'>Create an account</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SignUp