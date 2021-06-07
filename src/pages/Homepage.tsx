import { useEffect } from "react";
import useHttpClient from "../hooks/http-hook";
import Layout from '../hoc/Layout';
import Post from "../components/Post";
import { AxiosRequestConfig } from 'axios';
import * as jwt from 'jsonwebtoken';
//Redux area
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';
import { userActions } from '../store/user';

import { RootState } from '../store/index';
import { Post as PostInterface } from '../interfaces';
const ACCESS_TOKEN = 'access_token';

const Homepage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const token = localStorage.getItem(ACCESS_TOKEN);
  const { makeRequest } = useHttpClient();

  const removeDuplicateById = (arr: PostInterface[]) => {
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
      const usersByPosts = removeDuplicateById(response.map((item: PostInterface) => item.user));
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

  //Component Did mount
  useEffect(() => {
    //Query user info
    if (token) {
      const decoded: any = jwt.decode(token);
      getUserInfo(decoded.userId);
    }
    //Query the posts
    fetchPosts();
  }, []);

  let fetchedPosts;
  if (posts && posts.length) {
    fetchedPosts = posts.map((post) => {
      return <Post key={post.id} title={post.title} content={post.content} id={post.id} createdAt={post.createdAt} user={post.user} image={post.image} />;
    });
  }

  return (
    <Layout
      leftSideBar={'Friends suggestion'}
      main={fetchedPosts}
      rightSideBar={'Chatbox'}
    />
  );
};

export default Homepage;
