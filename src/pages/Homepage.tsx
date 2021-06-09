import Layout from '../hoc/Layout';
import Post from "../components/Post";
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const Homepage = () => {
  const posts = useSelector((state: RootState) => state.post.posts);

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
