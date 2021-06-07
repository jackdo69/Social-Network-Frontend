//React redux
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from "axios";
import { authActions } from '../store/auth';
import { RootState } from "../store";
import { useHistory } from "react-router-dom";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const BASE_URL = "http://localhost:4000";

const useAuth = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const history = useHistory();

    const login = (accessToken: string, refreshToken: string) => {
        dispatch(authActions.login({ accessToken, refreshToken }));
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    };

    const logout = () => {
        dispatch(authActions.logout({}));
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
    const renewToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const token = localStorage.getItem(ACCESS_TOKEN);
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/auth/renewToken`,
            method: "post",
            data: { refreshToken: refreshToken },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios(options);
            const { accessToken } = response.data;
            login(accessToken, refreshToken!);
        } catch (e) {
            history.push('/auth');
        }
    };


    return {
        isLoggedIn, login, logout, renewToken
    };
};

export default useAuth;