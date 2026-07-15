import { hash } from 'bcryptjs';
import { Prisma } from '../../generated/prisma/client.js';
import { ApiError } from '../errors/api-error.js';
import type { RequestOrg, ResponseOrg } from '../http/schemas/org-schema.js';
import type { OrgRepository } from '../repositories/org-repository.js';

export class RegisterOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async run(data: RequestOrg): Promise<ResponseOrg> {
    if (data.password.length < 6) {
      throw new ApiError('Password must be at least 6 characters.', 422);
    }

    const whatsappRegex = /^[1-9]{2}9[0-9]{8}$/;
    if (!whatsappRegex.test(data.whatsapp)) {
      throw new ApiError('WhatsApp must be in the format DDD + 9 digits (numbers only).', 422);
    }

    const orgWithSameEmail = await this.orgRepository.findByEmail(data.email);

    if (orgWithSameEmail) {
      throw new ApiError('Email already registered.', 409);
    }

    const { password, ...orgData } = data;
    const createdOrg = await this.orgRepository.create({
      ...orgData,
      passwordHash: await hash(password, 6),
      latitude: new Prisma.Decimal(data.latitude),
      longitude: new Prisma.Decimal(data.longitude),
    });

    const response: ResponseOrg = {
      name: createdOrg.name,
      email: createdOrg.email,
      whatsapp: createdOrg.whatsapp,
      address: createdOrg.address,
      latitude: Number(createdOrg.latitude),
      longitude: Number(createdOrg.longitude),
      id: createdOrg.id,
    };

    return response;
  }
}
