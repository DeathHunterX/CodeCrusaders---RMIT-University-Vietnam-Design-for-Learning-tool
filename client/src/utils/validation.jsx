export const registerValidation = ({username, fullname, email, password, cf_password}) => {
    const err = {}

    if(!username) {
        err.username = "Please add your user name."
    } else if(username.toLowerCase().replace(/ /g, '').length > 25) {
        err.username = "User name is up to 10 characters long."
    }

    if(!fullname) {
        err.fullname = "Please add your full name."
    } else if(fullname.length > 25) {
        err.fullname = "Full name is up to 25 characters long."
    } 
    
    if(!password) {
        err.password = "Please add your password."
    } else if(password.length < 6) {
        err.password = "Password must at least 6 characters."
    }
    
    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match"
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}