import useHttpClient from './http-hook';
import { Post } from '../interfaces';
import { useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';
import { userActions } from '../store/user';
import { AxiosRequestConfig } from 'axios';


const removeDuplicateById = (arr: Post[]) => {
    const idArrs = [];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (idArrs.indexOf(item.id) === -1) {
            idArrs.push(item.id);
            result.push(item);
        }
    }
    return result;
};

const useInitData = () => {
    const dispatch = useDispatch();
    const { makeRequest } = useHttpClient();

    const fetchPosts = async () => {
        dispatch(loadingActions.setLoading({ status: true }));
        const options: AxiosRequestConfig = {
            url: "/post",
            method: "get",
            params: {
                size: 10,
            }
        };
        const response = await makeRequest(options);

        if (response) {
            const usersByPosts = removeDuplicateById(response.map((item: Post) => item.user));
            const usersByPostsInfo = await Promise.all(usersByPosts.map(async (item) => {
                const options: AxiosRequestConfig = {
                    url: `/user/${item.id}`,
                    method: "get"
                };

                const result = await makeRequest(options);
                return result;
            }));
            dispatch(userActions.setUsersByPosts({ usersByPostsInfo }));

            dispatch(postActions.loadPosts({
                posts: response
            }));
        }
        dispatch(loadingActions.setLoading({ status: false }));

    };

    const getUserInfo = async (userId: string) => {
        const options: AxiosRequestConfig = {
            url: `/user/${userId}`,
            method: 'get'
        };

        const user = await makeRequest(options);
        user && dispatch(userActions.setUser({ id: userId, ...user }));
    };

    return {
        fetchPosts, getUserInfo
    };
};

export default useInitData;