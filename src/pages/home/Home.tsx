import React from 'react';
import { Grid } from '@material-ui/core';
import Post from '../../components/Post/Post';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

//components
import { IPost } from '../../interfaces';
import { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import useInitData from '../../hooks/init-data-hook';
import * as jwt from 'jsonwebtoken';

export default function Home() {
  const { fetchPosts, getUserInfo, getFriendsSuggestions } = useInitData();
  const posts = useSelector((state: RootState) => state.post.posts);
  let fetchedPosts;
  if (posts && posts.length) {
    fetchedPosts = posts.map((post: IPost) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          id={post.id}
          createdAt={post.createdAt}
          user={post.user}
          image={post.image}
        />
      );
    });
  }

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwt.decode(token);
      fetchPosts();
      if (decoded !== null && typeof decoded !== 'string') {
        getUserInfo(decoded.userId);
        getFriendsSuggestions(decoded.userId);
      }
    }
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          {fetchedPosts}
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          side
        </Grid>
      </Grid>
    </>
  );
}
