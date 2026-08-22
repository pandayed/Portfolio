import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import { toHref } from '../routing/routes';
import type { Post } from './posts';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const formatDate = (date: string) => dateFormatter.format(new Date(`${date}T00:00:00`));

const PostDate = ({ label, date }: { label: string; date: string }) => {
    return (
        <div className="Blogs__date">
            <span className="Blogs__dateLabel">{label}</span>
            <time dateTime={date}>{formatDate(date)}</time>
        </div>
    );
};

const PostEntry = ({ title, summary, startedOn, updatedOn, route }: Post) => {
    return (
        <li className="Blogs__item">
            <a href={toHref(route)} className="Link Link--standalone Blogs__title">
                {title}
            </a>
            <p className="Blogs__summary">{summary}</p>
            <div className="Blogs__dates">
                <PostDate label="Started" date={startedOn} />
                <PostDate label="Updated" date={updatedOn} />
            </div>
        </li>
    );
};

interface PostListProps {
    posts: Post[];
    /* Shown instead of the list when there is nothing in this state yet. */
    emptyMessage: string;
}

/* The list of posts, shared by the blogs, drafts and archive pages. */
const PostList = ({ posts, emptyMessage }: PostListProps) => {
    if (posts.length === 0) {
        return <p className="Blogs__empty">{emptyMessage}</p>;
    }

    return (
        <ul className="Blogs__list">
            {posts.map((post) => (
                <PostEntry key={post.route} {...post} />
            ))}
        </ul>
    );
};

export default PostList;
