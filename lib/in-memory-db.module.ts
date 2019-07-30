import { Module } from '@nestjs/common';
import { InMemoryDBService } from './in-memory-db.service';

@Module({
  providers: [InMemoryDBService],
  exports: [InMemoryDBService],
})
export class InMemoryDBModule {}
