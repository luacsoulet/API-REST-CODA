import { CategoryRepository } from '../repositories/category.js';
import { GetCategoriesDto, CreateCategoryDto, GetCategoryByIdDto, UpdateCategoryDto, DeleteCategoryDto } from '../dtos/CategoryDtos.js';

export function registerCategoryRoutes(fastify) {
  fastify.get('/categories', { schema: GetCategoriesDto }, async function getCategories(request, reply){
    return await CategoryRepository.getCategories();
  });
  fastify.get('/categories/:id', { schema: GetCategoryByIdDto }, async function getCategoryById(request, reply){
    const id = parseInt(request.params.id);
    return await CategoryRepository.getCategoryById(id);
  });
  fastify.post('/categories', { schema: CreateCategoryDto }, async function createCategory(request, reply){
    const body = request.body;
    return await CategoryRepository.createCategory(body);
  });
  fastify.put('/categories/:id', { schema: UpdateCategoryDto }, async function updateCategory(request, reply){
    const id = parseInt(request.params.id);
    const body = request.body;
    return await CategoryRepository.updateCategory(id, body);
  });

  fastify.delete('/categories/:id', { schema: DeleteCategoryDto }, async function deleteCategory(request, reply){
    const id = parseInt(request.params.id);
    return await CategoryRepository.deleteCategory(id);
  });
}