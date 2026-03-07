import { useEffect } from 'react';
import { AppProvider } from './app/providers/AppProvider';
import { AppRouter } from './app/router/AppRouter';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  const { resolvedTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
