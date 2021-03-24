import React, { useEffect, useState } from "react";
import useHttpClient from "../../hooks/http-hook.js";

import Post from "../../components/Post/Post";
import useLoading from "../../components/Loading/Loading";

export default function Homepage() {
  const { isLoading, errors, makeRequest, clearErrors } = useHttpClient();
  const [posts, setLoadedPosts] = useState(null);
  const { loadingBackdrop, closeLoading, setLoading } = useLoading();

  const fetchPosts = async () => {
    try {
      setLoading();
      const response = await makeRequest({
        url: "/post",
        method: "get",
        params: {
          size: 10,
        },
      });
      setLoadedPosts(response.posts);
      closeLoading();
    } catch (err) {
      console.log(err);
    }
  };

  let fetchedPosts;
  if (posts) {
    fetchedPosts = posts.map((post) => {
      return (
        <Post
          title={post._source.title}
          content={post._source.content}
          user={post._source.user}
          createdAt={new Date(post._source.createdAt).getDay()}
          image={post._source.image}
        />
      );
    });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loadingBackdrop}
      {posts && fetchedPosts}
    </div>
  );
}
