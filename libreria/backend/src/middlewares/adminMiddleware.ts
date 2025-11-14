import type { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: string; email?: string; role?: string };
  book?: { ownerId?: string };
}

function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos de administrador' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error verificando permisos de admin' });
  }
}

function isAdminOrOwner(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    const ownerId = req.book?.ownerId;
    
    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    // Si es admin, puede editar cualquier libro
    if (user.role === 'admin') {
      return next();
    }

    // Si no es admin, solo puede editar sus propios libros
    if (user.id === ownerId) {
      return next();
    }

    return res.status(403).json({ message: 'No tienes permisos para modificar este libro' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verificando permisos' });
  }
}

module.exports = { isAdmin, isAdminOrOwner };
