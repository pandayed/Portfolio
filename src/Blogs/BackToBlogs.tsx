import './Blogs.css';
import '../CommonClasses/CommonClasses.css';

import { BLOGS_ROUTE, toHref } from '../routing/routes';

/* The way back from the drafts and archive pages. */
const BackToBlogs = () => {
    return (
        <a href={toHref(BLOGS_ROUTE)} className="Link Link--standalone Blogs__back">
            Back to blogs
        </a>
    );
};

export default BackToBlogs;
