//React redux
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from "axios";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL } from '../constant';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const useAuth = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    };

    const logout = () => {
        localStorage.clear();
    };

    const isLoggedIn = () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (accessToken && refreshToken) {
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
            logout();
            authCtx.setLoggedIn(false);
            history.push('/auth');
        }
    };


    return {
        isLoggedIn, login, logout, renewToken
    };
};

export default useAuth;