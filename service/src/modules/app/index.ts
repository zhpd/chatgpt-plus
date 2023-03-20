import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export { AppController, AppService };

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
