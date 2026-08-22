import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import Page from '../Page/Page';
import BackToBlogs from './BackToBlogs';
import PostList from './PostList';
import { draftPosts } from './posts';

const Drafts = () => {
    return (
        <Page title="Drafts">
            <BackToBlogs />
            <p className="Blogs__note">
                Posts I am still writing. They are readable, but they will change.
            </p>
            <PostList posts={draftPosts} emptyMessage="Nothing in draft right now." />
        </Page>
    );
};

export default Drafts;
