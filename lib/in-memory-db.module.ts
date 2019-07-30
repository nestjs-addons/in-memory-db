import { Module } from '@nestjs/common';
import { InMemoryDBService } from './services';

@Module({
  providers: [InMemoryDBService],
  exports: [InMemoryDBService],
})
export class InMemoryDBModule {}
