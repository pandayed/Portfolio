/* Theme resolution and persistence, kept free of React so the boot script in
   index.html and the hook agree on the same contract. */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

export const getStoredTheme = (): Theme | null => {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return isTheme(stored) ? stored : null;
    } catch {
        return null;
    }
};

export const storeTheme = (theme: Theme): void => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        /* Private browsing modes can reject writes; the in-memory theme still applies. */
    }
};

export const getSystemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

export const getInitialTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

export const applyTheme = (theme: Theme): void => {
    document.documentElement.dataset.theme = theme;
};

export const getAppliedTheme = (): Theme => {
    const applied = document.documentElement.dataset.theme;
    return isTheme(applied) ? applied : getInitialTheme();
};

/* Each caller of useTheme keeps its own state, so anything outside the toggle
   has to follow the attribute the toggle writes rather than the hook. */
export const watchAppliedTheme = (onChange: (theme: Theme) => void): (() => void) => {
    const observer = new MutationObserver(() => onChange(getAppliedTheme()));

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
};

export const watchSystemTheme = (onChange: (theme: Theme) => void): (() => void) => {
    const query = window.matchMedia(DARK_QUERY);
    const listener = (event: MediaQueryListEvent) => onChange(event.matches ? 'dark' : 'light');

    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
};
