import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ApiError } from './api-error.js';

export async function globalErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error.validation) {
    const issues: Record<string, string[]> = {};

    for (const issue of error.validation) {
      const field = issue.instancePath.slice(1); // remove a "/"

      if (!issues[field]) {
        issues[field] = [];
      }

      if (issue.message) {
        (issues[field] ??= []).push(issue.message);
      }
    }

    return reply.status(422).send({
      message: 'Validation error.',
      issues,
    });
  }

  if (error instanceof ApiError) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  console.log(error);
  return reply.status(500).send({ error: error });
}
