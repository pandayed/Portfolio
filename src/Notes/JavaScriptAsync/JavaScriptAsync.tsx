import LearningNotePage from '../LearningNotes/LearningNotePage';
import note from '../JavaScriptTypeScriptNotes/data/promises';
import { JAVASCRIPT_ASYNC_ROUTE, JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE } from '../../routing/routes';

const JavaScriptAsync = () => (
    <LearningNotePage
        note={note}
        route={JAVASCRIPT_ASYNC_ROUTE}
        backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
        backLabel="JavaScript notes"
    />
);

export default JavaScriptAsync;
