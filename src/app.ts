import fastify from 'fastify';
import { registerSwagger } from './config/swagger.js';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { z } from 'zod';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// registros
await registerSwagger(app);

app.withTypeProvider<ZodTypeProvider>().get(
  '/foo',
  {
    schema: {
      tags: ['test'],
      summary: 'Rota de teste',
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
  },
  async () => {
    return {
      message: 'foo funcionando',
    };
  },
);
