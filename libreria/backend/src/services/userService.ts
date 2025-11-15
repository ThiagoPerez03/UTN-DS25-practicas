// @ts-nocheck
const _prisma = require('../prisma');
const prisma = _prisma && _prisma.default ? _prisma.default : _prisma;
const bcrypt = require('bcryptjs');

async function createUser({ nombre, apellido, email, password }: { nombre?: string; apellido?: string; email: string; password: string }) {
  const hashed: string = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { nombre: nombre ?? null, apellido: apellido ?? null, email, password: hashed }
  });
  return user;
}

async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

async function verifyPassword(user: any, plain: string) {
  if (!user) return false;
  return await bcrypt.compare(plain, user.password);
}

async function updateUser(id: string, data: { nombre?: string; apellido?: string; email?: string; password?: string }) {
  const updateData: any = {};
  
  if (data.nombre !== undefined) updateData.nombre = data.nombre;
  if (data.apellido !== undefined) updateData.apellido = data.apellido;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  
  return await prisma.user.update({
    where: { id },
    data: updateData
  });
}

module.exports = { createUser, findUserByEmail, findUserById, verifyPassword, updateUser };
