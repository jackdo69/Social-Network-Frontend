import React, { useEffect, useState } from "react";
import useHttpClient from "../../hooks/http-hook.js";
import eventBus from "../../context/eventBus";
import Post from "../../components/Post/Post";
import useLoading from "../../components/Loading/Loading";

export default function Homepage() {
  const { makeRequest } = useHttpClient();
  const [posts, setPosts] = useState(null);
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
      setPosts(response.posts);
      closeLoading();
    } catch (err) {
      console.log(err);
    }
  };

  //Component Did mount
  useEffect(() => {
    fetchPosts();
    eventBus.on("postsChanged", (post) => {
      console.log("Event listened");
      fetchPosts();
    });
  }, []);

  useEffect(() => {
    console.log("Component did updated!");
  });

  let fetchedPosts;
  if (posts) {
    fetchedPosts = posts.map((post) => {
      return (
        <Post
          key={post._id}
          id={post._id}
          title={post._source.title}
          content={post._source.content}
          user={post._source.user}
          createdAt={new Date(post._source.createdAt).getDay()}
          image={post._source.image}
        />
      );
    });
  }

  return (
    <div>
      {loadingBackdrop}
      {posts && fetchedPosts}
    </div>
  );
}
