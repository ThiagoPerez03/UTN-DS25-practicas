import type { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

interface AuthRequest extends Request {
  user?: { id: string; email?: string; role?: string };
}

function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    console.log('❌ Missing token');
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = auth.replace('Bearer ', '');
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token válido. Payload:', payload);
    req.user = { id: payload.userId, email: payload.email, role: payload.role };
    console.log('✅ req.user establecido:', req.user);
    next();
  } catch (e) {
    console.error('❌ Token inválido:', e instanceof Error ? e.message : e);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { requireAuth };
