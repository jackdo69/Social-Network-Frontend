//React redux
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL } from '../constants';
import { userActions } from '../store/user';
import { postActions } from '../store/post';
import { friendActions } from '../store/friend';

const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  const logout = () => {
    localStorage.clear();
    dispatch(
      userActions.setUser({
        image: '',
        email: '',
        username: '',
        id: '',
        friends: [],
        notifications: [],
        requestSent: [],
      }),
    );
    dispatch(
      postActions.loadPosts({
        posts: [],
      }),
    );
    dispatch(friendActions.setFriendSuggestions({ list: [] }));
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
      method: 'post',
      data: { refreshToken: refreshToken },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(options);
      const { accessToken } = response.data;
      refreshToken && login(accessToken, refreshToken);
    } catch (e) {
      logout();
      history.push('/auth');
    }
  };

  return {
    isLoggedIn,
    login,
    logout,
    renewToken,
  };
};

export default useAuth;
