import React, { useState, useEffect } from 'react';
import { AuthContext } from './auth-core';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch { setUser(null); setToken(null); }
    }
  }, []);

  async function register(payload) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
    navigate('/');
  }

  async function login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
    navigate('/');
  }

  function logout() {
    localStorage.removeItem('auth');
    setUser(null);
    setToken(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// NOTE: the `useAuth` hook is exported from a separate file to keep this
// module focused on the provider component (avoids fast-refresh issues).
