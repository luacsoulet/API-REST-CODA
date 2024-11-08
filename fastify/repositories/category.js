import { prisma } from "../services/db.js";
import { NotFoundError } from "../utils/error.js";

export const CategoryRepository = {
  getCategories: async () => {
    return await prisma.categories.findMany({ include: { posts: true } });
  },
  getCategoryById: async (id) => {
    const category = await prisma.categories.findFirst({ where: { id: id, include: { posts: true } } });
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return category;
  },
  createCategory: async (categoryBody) => {
    return await prisma.categories.create({ data: categoryBody, include: { posts: true } });
  },
  updateCategory: async (id, categoryBody) => {
    const category = await prisma.categories.update({ where: { id: id }, data: categoryBody, include: { posts: true } });
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return category;
  },
  deleteCategory: async (id) => {
    const category = await prisma.categories.delete({ where: { id: id }, include: { posts: true } });
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return category;
  }
}