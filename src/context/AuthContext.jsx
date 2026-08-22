import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('supportflow-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  // On mount, if we have a token, confirm it's still valid and refresh the user.
  useEffect(() => {
    const token = localStorage.getItem('supportflow-token');
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .me()
      .then((res) => {
        setUser(res.data.data.user);
        localStorage.setItem('supportflow-user', JSON.stringify(res.data.data.user));
      })
      .catch(() => {
        // Token invalid/expired, or backend unreachable — the interceptor
        // already clears storage on a real 401. On a network error we keep
        // the cached user so the UI doesn't bounce someone to /login just
        // because the backend is briefly unreachable.
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSession = (userData, token) => {
    localStorage.setItem('supportflow-token', token);
    localStorage.setItem('supportflow-user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = useCallback(async (email, password) => {
    const res = await authService.login({ email, password });
    persistSession(res.data.data.user, res.data.data.token);
    return res.data.data.user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    persistSession(res.data.data.user, res.data.data.token);
    return res.data.data.user;
  }, []);

  const updateProfile = useCallback(async (name) => {
    const res = await authService.updateProfile({ name });
    const updated = res.data.data.user;
    setUser(updated);
    localStorage.setItem('supportflow-user', JSON.stringify(updated));
    return updated;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('supportflow-token');
    localStorage.removeItem('supportflow-user');
    setUser(null);
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
