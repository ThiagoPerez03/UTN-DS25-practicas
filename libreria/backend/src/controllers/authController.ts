import type { Request, Response } from 'express';
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

async function register(req: Request, res: Response) {
  const { nombre, apellido, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const existing = await userService.findUserByEmail(email);
  if (existing) return res.status(409).json({ message: 'Email already used' });
  const u = await userService.createUser({ nombre, apellido, email, password });
  const token = jwt.sign({ userId: u.id, email: u.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ user: { id: u.id, email: u.email, nombre: u.nombre }, token });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = await userService.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await userService.verifyPassword(user, password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, email: user.email, nombre: user.nombre }, token });
}

module.exports = { register, login };
