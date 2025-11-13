import React, { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { BooksContext } from './books-core';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  async function fetchBooks() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function addBook(book) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers,
      body: JSON.stringify(book),
    });
    const created = await res.json();
    setBooks(prev => [created, ...prev]);
    return created;
  }

  async function updateBook(id, patch) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(patch),
    });
    const updated = await res.json();
    setBooks(prev => prev.map(b => (b.id === id ? updated : b)));
    return updated;
  }

  async function deleteBook(id) {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE', headers });
    setBooks(prev => prev.filter(b => b.id !== id));
  }

  return (
    <BooksContext.Provider value={{ books, loading, error, fetchBooks, addBook, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
}

