import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import Accordion from '../Accordion/Accordion';
import Page from '../Page/Page';
import { toHref } from '../routing/routes';
import { posts, type Post } from './posts';

const CONTACT_LINK = 'mailto:lalbiharipandeyg@gmail.com';

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

const Blogs = () => {
    return (
        <Page title="Blogs">
            <Preface />
            <ul className="Blogs__list">
                {posts.map((post) => (
                    <PostEntry key={post.route} {...post} />
                ))}
            </ul>
        </Page>
    );
};

export default Blogs;
