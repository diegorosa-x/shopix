import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { Button } from './ui/Button';

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      aria-label="Alternar tema"
    >
      {theme === 'system' ? (
        <Monitor className="h-5 w-5" />
      ) : theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
