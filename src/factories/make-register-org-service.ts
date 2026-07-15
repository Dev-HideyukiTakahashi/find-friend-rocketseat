import { PrismaOrgRepository } from '../repositories/prisma/prisma-org-repository.js';
import { RegisterOrgService } from '../services/register-org-service.js';

export function makeRegisterOrgService() {
  const orgRepository = new PrismaOrgRepository();
  const registerOrgService = new RegisterOrgService(orgRepository);

  return registerOrgService;
}
