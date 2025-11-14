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
  const isAdmin = req.user?.role === 'admin';

  // Solo admin puede marcar un libro como destacado
  if (payload.featured && !isAdmin) {
    return res.status(403).json({ message: 'Solo administradores pueden destacar libros' });
  }

  // Si se marca como destacado, verificar que no haya otro destacado en la misma categoría
  if (payload.featured && payload.section) {
    const existingFeatured = await prisma.book.findFirst({
      where: { section: payload.section, featured: true }
    });
    if (existingFeatured) {
      // Devolver info del libro existente para que el frontend pregunte si quiere reemplazar
      return res.status(409).json({ 
        message: 'Ya existe un libro destacado en esta categoría',
        existingBook: {
          id: existingFeatured.id,
          title: existingFeatured.title,
          section: existingFeatured.section
        }
      });
    }
  }

  const created = await prisma.book.create({ data: { ...payload, ownerId, featured: payload.featured || false } });
  res.status(201).json(created);
}
const updateBook = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params as { id?: string };
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return res.status(404).json({ message: 'Not found' });
  
  const isAdmin = req.user?.role === 'admin';
  const isOwner = book.ownerId === req.user?.id;

  // Admin puede editar cualquier libro, usuarios normales solo los suyos
  if (!isAdmin && !isOwner) {
    return res.status(403).json({ message: 'No tienes permisos para editar este libro' });
  }

  // Solo admin puede MARCAR un libro como destacado (cambiar de false a true)
  // Usuarios normales pueden editar el libro pero no pueden cambiar el estado de destacado
  if (req.body.hasOwnProperty('featured') && !isAdmin) {
    // Si el usuario no es admin y está intentando cambiar el estado de destacado
    if (req.body.featured !== book.featured) {
      return res.status(403).json({ message: 'Solo administradores pueden marcar libros como destacados' });
    }
  }

  // Si se marca como destacado, verificar que no haya otro destacado en la misma categoría
  if (req.body.featured && req.body.section) {
    const existingFeatured = await prisma.book.findFirst({
      where: { 
        section: req.body.section, 
        featured: true,
        id: { not: id } // Excluir el libro actual
      }
    });
    if (existingFeatured) {
      // Devolver info del libro existente para que el frontend pregunte si quiere reemplazar
      return res.status(409).json({ 
        message: 'Ya existe un libro destacado en esta categoría',
        existingBook: {
          id: existingFeatured.id,
          title: existingFeatured.title,
          section: existingFeatured.section
        }
      });
    }
  }

  const updated = await prisma.book.update({ where: { id }, data: req.body });
  res.json(updated);
}
const removeBook = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params as { id?: string };
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return res.status(404).json({ message: 'Not found' });
  
  const isAdmin = req.user?.role === 'admin';
  const isOwner = book.ownerId === req.user?.id;

  // Admin puede eliminar cualquier libro, usuarios normales solo los suyos
  if (!isAdmin && !isOwner) {
    return res.status(403).json({ message: 'No tienes permisos para eliminar este libro' });
  }

  await prisma.book.delete({ where: { id } });
  res.status(204).send();
}

const replaceFeaturedBook = async (req: Request & { user?: any }, res: Response) => {
  const { oldBookId, newBookId } = req.body;
  
  console.log('replaceFeaturedBook - User:', req.user);
  console.log('replaceFeaturedBook - Body:', req.body);
  
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  
  const isAdmin = req.user?.role === 'admin';
  if (!isAdmin) {
    return res.status(403).json({ message: 'Solo administradores pueden destacar libros' });
  }

  if (!oldBookId || !newBookId) {
    return res.status(400).json({ message: 'Se requieren oldBookId y newBookId' });
  }

  try {
    // Desmarcar el libro anterior
    await prisma.book.update({
      where: { id: oldBookId },
      data: { featured: false }
    });

    // Marcar el nuevo libro como destacado
    const updated = await prisma.book.update({
      where: { id: newBookId },
      data: { featured: true }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error en replaceFeaturedBook:', error);
    res.status(500).json({ message: 'Error reemplazando libro destacado', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

module.exports = {
  listBooks,
  getBook,
  createBook,
  updateBook,
  removeBook,
  replaceFeaturedBook,
};
