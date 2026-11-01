import Page from '../Page/Page';
import { NOTES_ROUTE, toHref, type Route } from '../routing/routes';
import { getNoteGroup, getNoteParent } from './noteNavigation';
import NoteReadingTime from './NoteReadingTime';
import NoteTree from './NoteTree';
import { getNodeReadingMinutes } from './readingTime';

const NoteCollectionPage = ({ route }: { route: Route }) => {
    const group = getNoteGroup(route);
    if (!group) return null;
    const parent = getNoteParent(route);

    return (
        <Page title={group.title}>
            <NoteReadingTime minutes={getNodeReadingMinutes(group)} total />
            <a href={toHref(parent?.route ?? NOTES_ROUTE)} className="Link Link--standalone Notes__back">
                Back to {parent?.title ?? 'notes'}
            </a>
            <NoteTree nodes={group.children} />
        </Page>
    );
};

export default NoteCollectionPage;
