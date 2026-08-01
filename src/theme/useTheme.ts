import { useCallback, useEffect, useState } from 'react';

import {
    applyTheme,
    getInitialTheme,
    getStoredTheme,
    storeTheme,
    watchSystemTheme,
    type Theme,
} from './theme';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // Keep following the OS until the visitor picks a theme explicitly.
    useEffect(() => {
        return watchSystemTheme((systemTheme) => {
            if (!getStoredTheme()) {
                setTheme(systemTheme);
            }
        });
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => {
            const next: Theme = current === 'dark' ? 'light' : 'dark';
            storeTheme(next);
            return next;
        });
    }, []);

    return { theme, toggleTheme };
};
