import 'module-alias/register';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InMemoryDBModule } from '../../../lib';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
