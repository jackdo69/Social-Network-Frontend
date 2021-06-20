import {useEffect} from 'react'
import Layout from '../hoc/Layout';
import Post from "../components/Post";
import FriendSuggestions from '../components/FriendSuggestions'
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const Homepage = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  const friendSuggestions = ( <FriendSuggestions />)
  let fetchedPosts;
  if (posts && posts.length) {
    fetchedPosts = posts.map((post) => {
      return <Post key={post.id} title={post.title} content={post.content} id={post.id} createdAt={post.createdAt} user={post.user} image={post.image} />;
    });
  }
  
  return (
    <Layout
      leftSideBar={friendSuggestions}
      main={fetchedPosts}
      rightSideBar={'Chatbox'}
    />
  );
};

export default Homepage;
