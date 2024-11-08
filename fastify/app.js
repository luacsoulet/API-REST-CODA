import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import FastifyAuth from '@fastify/auth';
import { registerPostRoutes } from './controllers/post.js';
import { registerAuthRoutes } from './controllers/auth.js';
import { registerCategoryRoutes } from './controllers/category.js';
import { registerCheckAuthMiddleware } from './middlewares/auth.js';
import { registerErrorMiddleware } from './middlewares/error.js';

const fastify = Fastify({
  logger: true
});

await fastify.register(FastifySwagger, {
  openapi: {
    components: {
      securitySchemes: {
        token: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

await fastify.register(FastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
  },
});

await fastify.register(FastifyAuth);

fastify.register(FastifyCors, {
  origin: process.env.NODE_ENV === 'production' ? 'example.com' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
});

registerCheckAuthMiddleware(fastify);
registerErrorMiddleware(fastify);
registerAuthRoutes(fastify);
registerPostRoutes(fastify);
registerCategoryRoutes(fastify);
fastify.get('/', async function handler(request, reply){
  return { hello: 'world' }
});

try{
  await fastify.listen({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  });
  await fastify.ready();
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
};