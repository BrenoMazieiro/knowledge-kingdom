import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const next = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={next}
      className="rounded-md p-2 hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === 'light' && '☀️'}
      {theme === 'dark' && '🌙'}
      {theme === 'system' && '💻'}
    </button>
  );
};
