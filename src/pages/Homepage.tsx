import React, { useEffect } from "react";
import useHttpClient from "../hooks/http-hook";
import Post from "../components/Post";
import useLoading from "../components/Loading";
import { AxiosRequestConfig } from 'axios';

//Redux area
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { RootState } from '../store/index';

const Homepage = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useHttpClient();
  const posts = useSelector((state: RootState) => state.post.posts);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { loadingBackdrop, closeLoading } = useLoading();

  const fetchPosts = async () => {
    try {
      const options: AxiosRequestConfig = {
        url: "/post",
        method: "get",
        params: {
          size: 10,
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await makeRequest(options);

      dispatch(postActions.loadPosts({
        posts: response
      }));
      closeLoading();
    } catch (err) {
      console.log(err);
    }
  };

  //Component Did mount
  useEffect(() => {
    //Query the posts
    fetchPosts();
  }, []);

  let fetchedPosts;
  if (posts && posts.length) {
    fetchedPosts = posts.map((post) => {
      return <Post key={post.id} content={post.content} id={post.id} createdAt={post.createdAt} user={post.user} image={post.image} />;
    });
  }

  return (
    <div>
      {loadingBackdrop}
      {fetchedPosts}
    </div>
  );
};

export default Homepage;
