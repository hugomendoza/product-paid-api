import { mockReset } from 'jest-mock-extended';
import { prismaMock } from './__mocks__/prisma';

beforeEach(() => {
  mockReset(prismaMock);
});
