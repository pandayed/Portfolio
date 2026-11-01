import './NoteBreadcrumbs.css';

import { NOTES_ROUTE, toHref, type Route } from '../routing/routes';
import { getNotePath } from './noteNavigation';

const NoteBreadcrumbs = ({ route }: { route: Route }) => {
    const path = getNotePath(route);
    if (!path.length) return null;

    return (
        <nav className="NoteBreadcrumbs" aria-label="Note location">
            <ol>
                <li><a href={toHref(NOTES_ROUTE)} className="NavLink">Notes</a></li>
                {path.map((node, index) => (
                    <li key={node.route}>
                        {index === path.length - 1
                            ? <span aria-current="page">{node.title}</span>
                            : <a href={toHref(node.route)} className="NavLink">{node.title}</a>}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default NoteBreadcrumbs;
