import type { Org } from '../../generated/prisma/client.js';
import type { OrgCreateInput } from '../../generated/prisma/models.js';

export interface OrgRepository {
  create(data: OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
