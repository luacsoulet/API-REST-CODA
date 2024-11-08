import { UserRepository } from '../repositories/user.js';
import { GetUserByIdDto, CreateUserDto, DeleteUserDto, GetUserByEmailAndPasswordDto, GetUsersDto } from '../dtos/UserDtos.js';
import JWT from 'jsonwebtoken';
import {createHash} from 'crypto';

export function registerAuthRoutes(fastify){
  fastify.get('/users/:id', { schema: GetUserByIdDto }, async function getUser(request, reply){
    const id = parseInt(request.params.id);
    return await UserRepository.getUserById(id);
  });

  fastify.post('/login', { schema: GetUserByEmailAndPasswordDto }, async function login(request, reply){
    const body = request.body;
    body.password = createHash('sha1')
      .update(body.password + process.env.PASSWORD_SALT)
      .digest('hex');
    const user = await UserRepository.getUserByEmailAndPassword(body.email, body.password);
    if (!user) {
      throw new Error('Invalid Email or Password').status(401);
    }
    user.token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
    return user;
  });

  fastify.post('/signup', { schema: CreateUserDto }, async function signup(request, reply){
    const body = request.body;
    body.password = createHash('sha1')
      .update(body.password + process.env.PASSWORD_SALT)
      .digest('hex');
    const user = await UserRepository.createUser(body);
    return user;
  });

  fastify.delete('/users/:id', { schema: DeleteUserDto }, async function deleteUser(request, reply){
    const id = parseInt(request.params.id);
    return await UserRepository.deleteUser(id);
  });

  fastify.get('/users', { schema: GetUsersDto }, async function getUsers(request, reply){
    return await UserRepository.getUsers();
  });
};
