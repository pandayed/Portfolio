import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import Page from '../Page/Page';
import { toHref } from '../routing/routes';
import { posts, type Post } from './posts';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const formatDate = (date: string) => dateFormatter.format(new Date(`${date}T00:00:00`));

const PostEntry = ({ title, summary, publishedOn, route }: Post) => {
    return (
        <li className="Blogs__item">
            <a href={toHref(route)} className="Link Link--standalone Blogs__title">
                {title}
            </a>
            <p className="Blogs__summary">{summary}</p>
            <time className="Blogs__date" dateTime={publishedOn}>
                {formatDate(publishedOn)}
            </time>
        </li>
    );
};

const Blogs = () => {
    return (
        <Page title="Blogs">
            <ul className="Blogs__list">
                {posts.map((post) => (
                    <PostEntry key={post.route} {...post} />
                ))}
            </ul>
        </Page>
    );
};

export default Blogs;
