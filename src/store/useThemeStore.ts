import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: getSystemTheme(),
      toggleTheme: () => {
        const currentTheme = get().theme;
        let nextTheme: 'light' | 'dark' | 'system';
        
        if (currentTheme === 'system') nextTheme = 'dark';
        else if (currentTheme === 'dark') nextTheme = 'light';
        else nextTheme = 'system';

        const resolved = nextTheme === 'system' ? getSystemTheme() : nextTheme;
        set({ theme: nextTheme, resolvedTheme: resolved });
      },
      setTheme: (theme) => {
        const resolved = theme === 'system' ? getSystemTheme() : theme;
        set({ theme, resolvedTheme: resolved });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Update resolved theme on hydration in case system preference changed
          if (state.theme === 'system') {
            state.resolvedTheme = getSystemTheme();
          }
        }
      },
    }
  )
);
