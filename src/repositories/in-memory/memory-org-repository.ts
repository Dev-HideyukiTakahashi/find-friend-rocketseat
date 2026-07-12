import type { OrgRepository } from '../org-repository.js';
import type { Org } from '../../../generated/prisma/client.js';
import { randomUUID } from 'node:crypto';

export class MemoryOrgRepository implements OrgRepository {
  orgs: Org[] = [];

  async create(data: Org): Promise<Org> {
    const org = { ...data, id: randomUUID(), createdAt: new Date() };

    this.orgs.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find(org => org.email === email);

    return org ? org : null;
  }
}
