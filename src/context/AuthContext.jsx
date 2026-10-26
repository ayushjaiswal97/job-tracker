import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { uid } from '../utils/helpers';

const AuthContext = createContext(null);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Demo only. A real app hashes passwords on a server (bcrypt/argon2).
const fakeHash = (text) => btoa(encodeURIComponent(text));

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(STORAGE_KEYS.users, []);
  const [sessionId, setSessionId] = useLocalStorage(STORAGE_KEYS.session, null);

  const user = useMemo(() => users.find((u) => u.id === sessionId) ?? null, [users, sessionId]);

  const signup = useCallback(
    async ({ name, email, password }) => {
      await wait(600); // simulate a network request
      const cleanEmail = email.trim().toLowerCase();
      if (users.some((u) => u.email === cleanEmail)) {
        throw new Error('An account with this email already exists. Try logging in.');
      }
      const newUser = { id: uid(), name: name.trim(), email: cleanEmail, password: fakeHash(password) };
      setUsers((prev) => [...prev, newUser]);
      setSessionId(newUser.id);
    },
    [users, setUsers, setSessionId]
  );

  const login = useCallback(
    async ({ email, password }) => {
      await wait(600);
      const found = users.find((u) => u.email === email.trim().toLowerCase());
      if (!found || found.password !== fakeHash(password)) {
        throw new Error('Email or password is incorrect.');
      }
      setSessionId(found.id);
    },
    [users, setSessionId]
  );

  const logout = useCallback(() => setSessionId(null), [setSessionId]);

  const value = useMemo(() => ({ user, signup, login, logout }), [user, signup, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
