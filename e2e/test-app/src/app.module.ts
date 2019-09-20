import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
