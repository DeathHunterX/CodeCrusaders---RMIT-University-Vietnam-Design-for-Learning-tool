import axios from "axios";
import jwt_decode from "jwt-decode";
import { getRefreshToken, setAccessToken } from "../utils/CookieSetUp";
// import moment from "moment";
import { setAuthTokens } from "../redux/slices/authSlice";
import { postDataAPI } from "./fetchData";
import moment from "moment";

export const AxiosMiddleware = (store) => (next) => (action) => {
    if (!store) return;

    const {dispatch} = store

    axios.interceptors.request.use((request) => {
        return request
    }, (error) => {
        return Promise.reject(error);
    })
    
    axios.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url !== "auth/login" && error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
          
                const checkRefreshToken = getRefreshToken();
                
                try {
                    const res = await postDataAPI('auth/refresh-token', {refreshToken: checkRefreshToken})
          
                    const combinedToken = `Bearer ${res.data?.accessToken}`
        
                    dispatch(setAuthTokens({accessToken: combinedToken, refreshToken: checkRefreshToken}))
        
                    const tokenDecoded = jwt_decode(res.data?.accessToken)
                    setAccessToken(combinedToken, moment.unix(tokenDecoded.exp))

                    console.log(res)

                    return axios(originalRequest)
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(error)
    })

    return next(action);
}