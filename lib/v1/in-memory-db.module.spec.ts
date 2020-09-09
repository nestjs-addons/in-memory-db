import { Test } from '@nestjs/testing';
import { InMemoryDBV1Module } from './in-memory-db.module';

describe('InMemoryDBV1Module', () => {
  describe('forRoot', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBV1Module.forRoot({})],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBV1Module).toBeDefined();
    });
  });
  describe('forRoot - no object', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBV1Module.forRoot()],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBV1Module).toBeDefined();
    });
  });
  describe('forFeature', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBV1Module.forFeature('feature', {})],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBV1Module).toBeDefined();
    });
  });
  describe('forFeature - no object', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBV1Module.forFeature('feature')],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBV1Module).toBeDefined();
    });
  });
});
