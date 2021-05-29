import { useEffect } from "react";
import useHttpClient from "../hooks/http-hook";
import Post from "../components/Post";
import { AxiosRequestConfig } from 'axios';

//Redux area
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';

import { RootState } from '../store/index';

const Homepage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
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

    dispatch(postActions.loadPosts({
      posts: response
    }));
    dispatch(loadingActions.setLoading({ status: false }));

  };

  //Component Did mount
  useEffect(() => {
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
    <div>
      {fetchedPosts}
    </div>
  );
};

export default Homepage;
