import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import Page from '../Page/Page';
import BackToBlogs from './BackToBlogs';
import PostList from './PostList';
import { archivedPosts } from './posts';

const Archive = () => {
    return (
        <Page title="Archive">
            <BackToBlogs />
            <p className="Blogs__note">
                Posts I have retired. They stay here for anyone who linked to them.
            </p>
            <PostList posts={archivedPosts} emptyMessage="Nothing archived yet." />
        </Page>
    );
};

export default Archive;
