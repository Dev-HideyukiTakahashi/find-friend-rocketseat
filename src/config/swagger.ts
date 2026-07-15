import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'FindAFriend API',
        description: 'Documentação da API do projeto FindAFriend',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Local' }],
      tags: [
        { name: 'orgs', description: 'Operações de organizações' },
        { name: 'pets', description: 'Operações de pets' },
      ],
    },
    transform: jsonSchemaTransform,
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });
}
