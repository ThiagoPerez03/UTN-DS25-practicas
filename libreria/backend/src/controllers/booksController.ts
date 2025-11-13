import type { Request, Response } from 'express';
const service = require('../services/booksService');

const listBooks = async (req: Request, res: Response) => {
  const books = await service.getAllBooks();
  res.json(books);
}

const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await service.getBookById(id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
}

const createBook = async (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload || !payload.title) return res.status(400).json({ message: 'Invalid payload' });
  const newBook = await service.createBook(payload);
  res.status(201).json(newBook);
}

const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await service.updateBook(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
}

const removeBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ok = await service.deleteBook(id);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.status(204).send();
}

module.exports = {
  listBooks,
  getBook,
  createBook,
  updateBook,
  removeBook,
};
