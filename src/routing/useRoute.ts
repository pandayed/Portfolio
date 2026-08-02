import { useEffect, useState } from 'react';

import { parseRoute, type Route } from './routes';

export const useRoute = (): Route => {
    const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute(window.location.hash));

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    // A new page starts at the top rather than inheriting the previous scroll.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [route]);

    return route;
};
