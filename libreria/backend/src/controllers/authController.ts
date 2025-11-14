import type { Request, Response } from 'express';
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

async function register(req: Request, res: Response) {
  try {
    const { nombre, apellido, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await userService.findUserByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email already used' });
    const u = await userService.createUser({ nombre, apellido, email, password });
    const token = jwt.sign({ userId: u.id, email: u.email, role: u.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: u.id, email: u.email, nombre: u.nombre, apellido: u.apellido, role: u.role, createdAt: u.createdAt }, token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await userService.verifyPassword(user, password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, email: user.email, nombre: user.nombre, apellido: user.apellido, role: user.role, createdAt: user.createdAt }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

async function updateProfile(req: Request & { user?: any }, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { nombre, apellido, email } = req.body;

    // Actualizar usuario (sin cambio de contraseña)
    const updatedUser = await userService.updateUser(userId, {
      nombre,
      apellido,
      email,
    });

    res.json({ 
      user: { 
        id: updatedUser.id, 
        email: updatedUser.email, 
        nombre: updatedUser.nombre, 
        apellido: updatedUser.apellido,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt
      } 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Update failed', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

module.exports = { register, login, updateProfile };
