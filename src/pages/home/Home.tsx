import React from 'react';
import { Grid } from '@material-ui/core';
import Post from '../../components/Post/Post';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

//components
import PageTitle from '../../components/PageTitle/PageTitle';
import { IPost } from '../../interfaces';

export default function Home() {
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
