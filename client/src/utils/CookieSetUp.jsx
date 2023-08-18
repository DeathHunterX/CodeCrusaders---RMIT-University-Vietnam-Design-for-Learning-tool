
import Cookies from 'js-cookie';

// const TOKEN_EXPIRATION_HOURS = 6; // Token expiration time in hours

export const setTokens = (accessToken, refreshToken, accessTokenExpiration, refreshTokenExpiration) => {
    Cookies.set('accessToken', accessToken, { expires: accessTokenExpiration.toDate(), secure: true });
    Cookies.set('refreshToken', refreshToken, { expires: refreshTokenExpiration.toDate(), secure: true });
};

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const setAccessToken = (accessToken, accessTokenExpiration) => {
    Cookies.set('accessToken', accessToken, { expires: accessTokenExpiration.toDate(), secure: true});
}

export const clearTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
