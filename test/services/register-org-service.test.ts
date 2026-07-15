import { beforeEach, expect } from 'vitest';
import { describe, it } from 'vitest';
import { makeOrg } from '../factories/make-org.js';
import { RegisterOrgService } from '../../src/services/register-org-service.js';
import { MemoryOrgRepository } from '../../src/repositories/in-memory/memory-org-repository.js';
import { compare } from 'bcryptjs';
import { ApiError } from '../../src/errors/api-error.js';
import type { RequestOrg } from '../../src/http/schemas/org-schema.js';

describe('Register Org Service', () => {
  let org: RequestOrg;
  let orgRepository: MemoryOrgRepository;
  let sut: RegisterOrgService;

  beforeEach(() => {
    org = makeOrg();
    orgRepository = new MemoryOrgRepository();
    sut = new RegisterOrgService(orgRepository);
  });

  it('should be able to register a org', async () => {
    const result = await sut.run(org);

    expect(result.name).toEqual('Org example');
    expect(result.email).toEqual('org@example.com');
    expect(result.id).toEqual(expect.any(String));
  });

  it('should be able to hash a password', async () => {
    await sut.run(org);

    const orgInDatabase = orgRepository.orgs[0];

    const isPasswordValid = await compare('123456', orgInDatabase!.passwordHash);

    expect(isPasswordValid).toBe(true);
  });

  it('should not be able to register a org with small password', async () => {
    const orgWithInvalidPassword = { ...org, passwordHash: '123' };

    try {
      await sut.run(orgWithInvalidPassword);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);

      expect((error as ApiError).message).toBe('Password must be at least 6 characters.');

      expect((error as ApiError).statusCode).toBe(422);
    }
  });

  it('should not be able to register a org with same email', async () => {
    await sut.run(org);

    try {
      await sut.run(org);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);

      expect((error as ApiError).message).toBe('Email already registered.');

      expect((error as ApiError).statusCode).toBe(422);
    }
  });

  it('should not be able to register an org with an invalid whatsapp format', async () => {
    const invalidOrg = { ...org, whatsapp: '11877779999' };

    await expect(sut.run(invalidOrg)).rejects.toThrow(
      'WhatsApp must be in the format DDD + 9 digits (numbers only).',
    );
  });
});
