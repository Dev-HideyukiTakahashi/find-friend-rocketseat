import type { FastifyReply, FastifyRequest } from 'fastify';
import { registerOrgSchema } from '../schemas/org-schema.js';
import { makeRegisterOrgService } from '../../factories/make-register-org-service.js';

const registerOrgService = makeRegisterOrgService();

export async function registerOrgController(request: FastifyRequest, reply: FastifyReply) {
  const data = registerOrgSchema.parse(request.body);

  const org = await registerOrgService.run(data);

  return reply.status(201).send({ org });
}
