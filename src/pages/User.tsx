import Layout from '../hoc/Layout';
import Profile from '../components/Profile';

export default function User() {
    const profile = (
        <Profile />
    );
    return (
        <Layout
            leftSideBar={profile}
            main={'Personal Post'}
            rightSideBar={'Chatbox'}
        />
    );
};
