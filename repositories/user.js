import { prisma } from '../services/db.js';
import { NotFoundError } from '../utils/error.js';

export const UserRepository = {
  getUserById: async (id) => {
    const user = await prisma.users.findFirst({ where: { id: id } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  },
  getUserByEmailAndPassword: async (email, password) => {
    const user = await prisma.users.findFirst({ 
      where: { 
        email: email, 
        password: password 
      }
    });
    if (!user) {
      throw new NotFoundError('Invalid credentials');
    }
    return user;
  },
  createUser: async (userBody) => {
    const newUser = await prisma.users.create({ data: userBody });
    return newUser;
  },
  deleteUser: async (id) => {
    const user = await prisma.users.delete({ where: { id:id } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  },
  getUsers: async () => {
    const users = await prisma.users.findMany();
    return users;
  }
};
