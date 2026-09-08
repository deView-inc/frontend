import { THEME_STORAGE_KEY } from './theme-provider';

const themeScript = `(function () {
    try {
        var theme = localStorage.getItem('${THEME_STORAGE_KEY}');
        var isDark =
            theme === 'dark' ||
            ((!theme || theme === 'system') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        var resolved = isDark ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.style.colorScheme = resolved;
    } catch (e) {}
})();`;

const themeScriptHtml = { __html: themeScript };

/** Инлайн-скрипт, применяющий тему до гидратации, чтобы избежать мигания темы (FOUC). */
export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={themeScriptHtml}
            suppressHydrationWarning
        />
    );
}
