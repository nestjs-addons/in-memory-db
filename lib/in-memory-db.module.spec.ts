import { Test } from '@nestjs/testing';
import { InMemoryDBModule } from './in-memory-db.module';

describe('InMemoryDBModule', () => {
  describe('forRoot', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBModule.forRoot({})],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBModule).toBeDefined();
    });
  });
  describe('forRoot - no object', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBModule.forRoot()],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBModule).toBeDefined();
    });
  });
  describe('forFeature', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBModule.forFeature('feature', {})],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBModule).toBeDefined();
    });
  });
  describe('forFeature - no object', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [InMemoryDBModule.forFeature('feature')],
      }).compile();
    });

    it('should create', () => {
      expect(InMemoryDBModule).toBeDefined();
    });
  });
});
