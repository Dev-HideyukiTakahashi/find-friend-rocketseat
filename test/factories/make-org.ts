import type { RequestOrg } from '../../src/http/schemas/org-schema.js';

export function makeOrg(): RequestOrg {
  return {
    name: 'Org example',
    email: 'org@example.com',
    password: '123456',
    whatsapp: '11999999999',
    address: 'Rua das Flores, 123',
    latitude: -23.6826,
    longitude: -46.5954,
  };
}
