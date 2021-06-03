import Layout from '../hoc/Layout';
import Profile from '../components/Profile';

const User = () => {
    const profile = (
        <Profile />
    )
    return (
        <Layout
            leftSideBar={profile}
            main={'Personal Post'}
            rightSideBar={'Chatbox'}
        />
    );
};

export default User;