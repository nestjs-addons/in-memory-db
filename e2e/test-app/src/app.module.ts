import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '../../../lib';
import { AppController } from './';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
