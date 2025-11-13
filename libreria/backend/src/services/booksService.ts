const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '../data/books.json');

type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  imageUrl?: string;
  altText?: string;
  section?: string;
  featured?: boolean;
};

async function readData(): Promise<Book[]> {
  try {
    const content = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(content) as Book[];
  } catch (err) {
    return [];
  }
}

async function writeData(books: Book[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(books, null, 2), 'utf-8');
}

async function getAllBooks(): Promise<Book[]> {
  return await readData();
}

async function getBookById(id: string): Promise<Book | null> {
  const books = await readData();
  return books.find(b => b.id === id) || null;
}

async function createBook(book: Book): Promise<Book> {
  const books = await readData();
  books.unshift(book);
  await writeData(books);
  return book;
}

async function updateBook(id: string, patch: Partial<Book>): Promise<Book | null> {
  const books = await readData();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  const updated = { ...books[idx], ...patch } as Book;
  books[idx] = updated;
  await writeData(books);
  return updated;
}

async function deleteBook(id: string): Promise<boolean> {
  const books = await readData();
  const filtered = books.filter(b => b.id !== id);
  if (filtered.length === books.length) return false;
  await writeData(filtered);
  return true;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
