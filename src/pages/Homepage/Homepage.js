import React, { useEffect } from "react";
import useHttpClient from "../../hooks/http-hook.js";
import Post from "../../components/Post/Post";
import useLoading from "../../components/Loading/Loading";

//Redux area
import { useSelector, useDispatch } from 'react-redux'
import { postActions } from '../../store/post'

export default function Homepage() {
  const dispatch = useDispatch();
  const { makeRequest } = useHttpClient();
  const posts = useSelector(state => state.post.posts);
  const { loadingBackdrop, closeLoading } = useLoading();

  const fetchPosts = async () => {
    try {
      const response = await makeRequest({
        url: "/post",
        method: "get",
        params: {
          size: 10,
        },
      });

      dispatch(postActions.loadPosts({
        posts: response
      }))
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
      return <Post key={post.id} content={post} />;
    });
  }

  return (
    <div>
      {loadingBackdrop}
      {fetchedPosts}
    </div>
  );
}
