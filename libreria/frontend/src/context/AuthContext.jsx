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
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Error al registrarse. Por favor intenta de nuevo.');
      throw error;
    }
  }

  async function login(credentials) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem('auth');
    setUser(null);
    setToken(null);
    navigate('/');
  }

  async function updateUser(updateData) {
    try {
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Update failed');
      }
      
      // Actualizar usuario en el estado y localStorage
      setUser(data.user);
      localStorage.setItem('auth', JSON.stringify({ user: data.user, token }));
      
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// NOTE: the `useAuth` hook is exported from a separate file to keep this
// module focused on the provider component (avoids fast-refresh issues).
