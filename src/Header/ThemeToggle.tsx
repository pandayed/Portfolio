import { useTheme } from '../theme/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="ThemeToggle"
            aria-pressed={isDarkTheme}
            aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            {isDarkTheme ? '\u{1F319}' : '\u2600\uFE0F'}
        </button>
    );
};

export default ThemeToggle;
