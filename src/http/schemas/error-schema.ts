import { z } from 'zod';

export const errorResponseSchema = z.object({
  error: z.string(),
});

export const validationErrorResponseSchema = z.object({
  message: z.string(),
  issues: z.record(z.string(), z.array(z.string())),
});
