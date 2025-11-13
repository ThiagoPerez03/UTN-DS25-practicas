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

async function verifyPassword(user: any, plain: string) {
  if (!user) return false;
  return await bcrypt.compare(plain, user.password);
}
