import type { Org } from '../../generated/prisma/client.js';

export interface OrgRepository {
  create(data: Org): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
