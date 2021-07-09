import useHttpClient from './http-hook';
import { Post } from '../interfaces';
import { useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';
import { userActions } from '../store/user';
import { friendActions } from '../store/friend';
import { AxiosRequestConfig } from 'axios';

const useInitData = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useHttpClient();

  const fetchPosts = async () => {
    dispatch(loadingActions.setLoading({ status: true }));
    const options: AxiosRequestConfig = {
      url: '/post',
      method: 'get',
      params: {
        size: 10,
      },
    };
    const response = await makeRequest(options);

    dispatch(
      postActions.loadPosts({
        posts: response,
      }),
    );
    dispatch(loadingActions.setLoading({ status: false }));
  };

  const getUserInfo = async (userId: string) => {
    const options: AxiosRequestConfig = {
      url: `/user/${userId}`,
      method: 'get',
    };

    const user = await makeRequest(options);
    user && dispatch(userActions.setUser({ id: userId, ...user }));
  };

  const getFriendsSuggestions = async (userId: string) => {
    const options: AxiosRequestConfig = {
      url: `/user/${userId}/getFriendsSuggestions`,
      method: 'get',
    };

    const list = await makeRequest(options);
    list && dispatch(friendActions.setFriendSuggestions({ list }));
  };

  return {
    fetchPosts,
    getUserInfo,
    getFriendsSuggestions,
  };
};

export default useInitData;
