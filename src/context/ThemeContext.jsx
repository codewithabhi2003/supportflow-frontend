import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

// Applied at the app root (see main.jsx) so it runs on every page —
// Home, Login, Register included — not just once you're logged in.
// Previously this lived inside ThemeToggle, which only mounts inside the
// authenticated Sidebar, so public pages never actually picked up dark mode.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('supportflow-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('supportflow-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};