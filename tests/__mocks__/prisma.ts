import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

jest.mock('../../src/data/postgres-db', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

import { prisma } from '../../src/data/postgres-db';

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
