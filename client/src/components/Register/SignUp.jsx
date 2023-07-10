import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { registerUser, reset } from '../../redux/slices/authSlice'

import { usePreventAccess } from "../../hook/usePreventAccess";

const SignUp = () => {

    const SignUpState = {
        email: '',
        fName: '',
        lName: '',
        password: ''
    }

    const [registerData, setRegisterData] = useState(SignUpState)
    const {email, fName, lName, password} = useState(registerData)

    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    usePreventAccess();

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/')
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
                        Already have an account? <a href={"/login"}>Log in</a>
                    </p>

                    <div className="signUp-form">
                    <form onSubmit={handleRegister}>
                        <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="RMIT or email address"
                        required
                        onChange={handleChangeInput}
                        />
                        <div className="name">
                        <input
                            type="text"
                            name="fname"
                            value={fName}
                            placeholder="First Name"
                            required
                            onChange={handleChangeInput}
                        />
                        <div className="space"></div>
                        <input
                            type="text"
                            name="lname"
                            value={lName}
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
                        <a href="http://">Terms of use</a> and{" "}
                        <a href="/">Privacy Policy</a>
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