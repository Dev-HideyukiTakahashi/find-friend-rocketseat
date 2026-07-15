import type { FastifyInstance } from 'fastify';
import { registerOrgController } from '../controllers/register-org-controller.js';
import { orgResponseSchema, registerOrgSchema } from '../schemas/org-schema.js';
import z from 'zod';
import { errorResponseSchema, validationErrorResponseSchema } from '../schemas/error-schema.js';

export async function orgsRoutes(app: FastifyInstance) {
  app.post(
    '/orgs',
    {
      schema: {
        tags: ['Orgs'],
        summary: 'Cadastrar nova organização',
        body: registerOrgSchema,
        response: {
          201: z.object({ org: orgResponseSchema }),
          409: errorResponseSchema.describe('Conflict'),
          422: validationErrorResponseSchema.describe('Validation Error'),
          500: errorResponseSchema.describe('Internal Server Error'),
        },
      },
    },
    registerOrgController,
  );
}
