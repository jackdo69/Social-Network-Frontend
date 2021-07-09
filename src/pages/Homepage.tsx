import React from 'react';
import Layout from '../hoc/Layout';
import Post from '../components/Post';
import FriendSuggestions from '../components/FriendSuggestions';
import FriendList from '../components/FriendList';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

export default function Homepage() {
  const posts = useSelector((state: RootState) => state.post.posts);
  const friendSuggestions = <FriendSuggestions />;
  const friendList = <FriendList />;
  let fetchedPosts;
  if (posts && posts.length) {
    fetchedPosts = posts.map((post) => {
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

  return <Layout leftSideBar={friendSuggestions} main={fetchedPosts} rightSideBar={friendList} />;
}
