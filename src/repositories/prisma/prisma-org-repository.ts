import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import type { Org } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import type { OrgRepository } from '../org-repository.js';
import { ApiError } from '../../errors/api-error.js';

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Org): Promise<Org> {
    try {
      return await prisma.org.create({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ApiError('Email already registered.', 409);
      }

      throw error;
    }
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: { email },
    });

    return org ? org : null;
  }
}
