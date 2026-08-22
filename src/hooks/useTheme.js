import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('supportflow-theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('supportflow-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
};
