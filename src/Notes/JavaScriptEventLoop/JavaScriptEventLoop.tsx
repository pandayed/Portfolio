import LearningNotePage from '../LearningNotes/LearningNotePage';
import note from '../JavaScriptTypeScriptNotes/data/event-loop';
import { JAVASCRIPT_EVENT_LOOP_ROUTE, JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE } from '../../routing/routes';

const JavaScriptEventLoop = () => (
    <LearningNotePage
        note={note}
        route={JAVASCRIPT_EVENT_LOOP_ROUTE}
        backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
        backLabel="JavaScript notes"
    />
);

export default JavaScriptEventLoop;
