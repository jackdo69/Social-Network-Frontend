//React redux
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { RootState } from "../store";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const useAuth = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.accessToken);

    const login = (accessToken: string, refreshToken: string) => {
        dispatch(authActions.login({ accessToken, refreshToken }));
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    };

    const logout = () => {
        dispatch(authActions.logout);
        localStorage.clear();
    };

    const isLoggedIn = () => {
        if (token.length) return true;
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (accessToken && refreshToken) {
            dispatch(authActions.login({ accessToken, refreshToken }));
            return true;
        }
        return false;
    };

    //TODO implement the refresh token function
    const renewToken = () => { };


    return {
        isLoggedIn, login, logout, renewToken
    };
};

export default useAuth;