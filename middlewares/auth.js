import { UserRepository } from "../repositories/user.js";
import JWT from 'jsonwebtoken';

export function registerCheckAuthMiddleware(fastify) {
  fastify.decorate('authUser', async function (request, reply) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      reply.code(401).send({ message: 'Token not found' });
      return;
    }
    const token = authHeader.replace('Bearer ', '');
    
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET);
      const user = await UserRepository.getUserById(payload.id);
      if (!user) {
        reply.code(401).send({ message: 'User not found' });
        return;
      }
      request.user = user;
    } 
    catch(err){
      reply.code(401).send({ message: 'Invalid token' });
      return;
    }
  });
}