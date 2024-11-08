import { PostRepository } from '../repositories/post.js';
import { GetPostsDto, CreatePostDto, GetPostByIdDto, UpdatePostDto, DeletePostDto, AddCategoryToPostDto } from '../dtos/PostDtos.js';
import { UnauthorizedError } from '../utils/error.js';


export function registerPostRoutes(fastify){
  fastify.get('/posts', { schema: GetPostsDto }, async function getPosts(request, reply){
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 12;
    return await PostRepository.getPosts(page, limit);
  });

  fastify.get('/posts/:id', { schema: GetPostByIdDto }, async function getPost(request, reply){
    const id = parseInt(request.params.id);
    return await PostRepository.getPostById(id);
  });

  fastify.post('/posts', { preHandler: [fastify.authUser], schema: CreatePostDto }, async function createPost(request, reply){
    const userId = request.user.id;
    const body = request.body;
    body.authorId = userId;
    return await PostRepository.createPost(body);
  });

  fastify.put('/posts/:id', { preHandler: [fastify.authUser], schema: UpdatePostDto }, async function updatePost(request, reply){
    const id = parseInt(request.params.id);
    const oldPost = await PostRepository.getPostById(id);
    const userId = request.user.id;
    if (oldPost.author.id !== userId) {
      throw new UnauthorizedError('You cannot modify someone else\'s post');
    }
    const body = request.body;
    return await PostRepository.updatePost(id, body);
  });

  fastify.delete('/posts/:id', { schema: DeletePostDto }, async function deletePost(request, reply){
    const id = parseInt(request.params.id);
    return await PostRepository.deletePost(id);
  });

  fastify.post('/posts/:id/categories/:categoryId', { preHandler: [fastify.authUser], schema: AddCategoryToPostDto }, async function addCategoryToPost(request, reply){
    const id = parseInt(request.params.id);
    const categoryId = parseInt(request.params.categoryId);
    return await PostRepository.AddCategoryToPostDto(id, categoryId);
  });
};
