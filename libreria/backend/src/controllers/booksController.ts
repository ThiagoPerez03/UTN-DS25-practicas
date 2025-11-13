import type { Request, Response } from 'express';
const prisma = require('../prisma').default ?? require('../prisma');

const listBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({ include: { owner: { select: { id: true, email: true, nombre: true } } } });
  res.json(books);
}

const getBook = async (req: Request, res: Response) => {
  const { id } = req.params as { id?: string };
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
}

const createBook = async (req: Request & { user?: any }, res: Response) => {
  const payload = req.body;
  if (!payload || !payload.title) return res.status(400).json({ message: 'Invalid payload' });
  const ownerId = req.user?.id;
  const created = await prisma.book.create({ data: { ...payload, ownerId } });
  res.status(201).json(created);
}
const updateBook = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params as { id?: string };
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return res.status(404).json({ message: 'Not found' });
  if (book.ownerId && book.ownerId !== req.user?.id) return res.status(403).json({ message: 'Forbidden' });
  const updated = await prisma.book.update({ where: { id }, data: req.body });
  res.json(updated);
}
const removeBook = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params as { id?: string };
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return res.status(404).json({ message: 'Not found' });
  if (book.ownerId && book.ownerId !== req.user?.id) return res.status(403).json({ message: 'Forbidden' });
  await prisma.book.delete({ where: { id } });
  res.status(204).send();
}
module.exports = {
  listBooks,
  getBook,
  createBook,
  updateBook,
  removeBook,
};
