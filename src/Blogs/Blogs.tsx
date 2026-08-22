import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import Accordion from '../Accordion/Accordion';
import Page from '../Page/Page';
import { ARCHIVE_ROUTE, DRAFTS_ROUTE, toHref } from '../routing/routes';
import PostList from './PostList';
import { publishedPosts } from './posts';

const CONTACT_LINK = 'mailto:lalbiharipandeyg@gmail.com';

const Preface = () => {
    return (
        <Accordion summary="Before you read">
            <p>
                I write these posts for my own curiosity first, and for other readers second.
            </p>
            <p>
                The sources are mostly articles on the internet, sometimes books, and sometimes
                AI. All of them are produced by humans, directly or indirectly, and humans make
                mistakes.
            </p>
            <p>
                So if you find an error, please{' '}
                <a href={CONTACT_LINK} className="Link">
                    report it
                </a>
                .
            </p>
        </Accordion>
    );
};

const OtherStates = () => {
    return (
        <nav className="Blogs__states" aria-label="Other post states">
            <a href={toHref(DRAFTS_ROUTE)} className="Link Link--standalone">
                Drafts
            </a>
            <a href={toHref(ARCHIVE_ROUTE)} className="Link Link--standalone">
                Archive
            </a>
        </nav>
    );
};

const Blogs = () => {
    return (
        <Page title="Blogs">
            <Preface />
            <PostList posts={publishedPosts} emptyMessage="Nothing published yet." />
            <OtherStates />
        </Page>
    );
};

export default Blogs;
