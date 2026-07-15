import { z } from 'zod';

const orgSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  whatsapp: z.string().regex(/^[1-9]{2}9[0-9]{8}$/, {
    message: 'WhatsApp must be in the format DDD + 9 digits (numbers only).',
  }),
  address: z.string().trim().min(1, 'Address is required'),
  latitude: z.coerce.number().refine(value => {
    return Math.abs(value) <= 90;
  }, 'Latitude must be between -90 and 90'),
  longitude: z.coerce.number().refine(value => {
    return Math.abs(value) <= 180;
  }, 'Longitude must be between -180 and 180'),
});

export const registerOrgSchema = orgSchema;

export const orgResponseSchema = orgSchema.omit({ password: true }).extend({
  id: z.uuid(),
});

export type RequestOrg = z.infer<typeof orgSchema>;
export type ResponseOrg = z.infer<typeof orgResponseSchema>;
