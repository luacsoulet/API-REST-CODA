import { prisma } from '../services/db.js';
import { NotFoundError } from '../utils/error.js';

export const PostRepository = {
  getPosts: async (page, limit) => {
    
    return await prisma.posts.findMany({ 
      skip: (page - 1) * limit, 
      take: limit,
      include: {
        author: true,
        categories: { include: { category: true } }
      }
    });
  },
  getPostById: async (id) => {
    const post = await prisma.posts.findFirst({ 
      where: { id: id },
      include: {
        author: true,
        categories: { include: { category: true } }
      }
    });
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return post;
  },
  createPost: async (postBody) => {
    const newPost = await prisma.posts.create({ 
      data: postBody, 
      include: { 
        author: true, 
        categories: { include: { category: true } }
      } 
    });
    return newPost;
  },
  updatePost: async (id, postBody) => {
    const oldPost = await prisma.posts.findFirst({ where: { id: id } });
    if (!oldPost) {
      throw new NotFoundError('Post not found');
    }
    const newPost = await prisma.posts.update({ 
      where: { id: id }, 
      data: postBody, 
      include: { 
        author: true, 
        categories: { include: { category: true } }
      } 
    });
    return newPost;
  },
  deletePost: async (id) => {
    const post = await prisma.posts.delete({ where: { id: id }, include: { author: true, categories: { include: { category: true } } } });
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return post;
  },
  AddCategoryToPostDto: async (postId, categoryId) => {
    return await prisma.posts.findFirst({ where: { id: postId }, data: { categories: { create: { id: categoryId } } } });
  },
};
