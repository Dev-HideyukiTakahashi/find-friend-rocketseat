import fastify from 'fastify';
import { registerSwagger } from './config/swagger.js';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { z } from 'zod';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from './lib/prisma.js';

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
    await prisma.pet.create({
      data: {
        name: 'Rex',
        about: 'Um cachorro muito amigável.',
        age: 'ADULT',
        size: 'MEDIUM',
        energyLevel: 3,
        independence: 'MEDIUM',
        environment: 'LARGE',
        requirements: ['Precisa de quintal', 'Gosta de crianças'],
        photos: ['url-da-foto-1.jpg'],
        orgId: 'ID-DA-ONG-CADASTRADA-NO-BANCO',
      },
    });
    return {
      message: 'foo funcionando',
    };
  },
);
