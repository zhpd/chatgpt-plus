import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatgptController } from './chatgpt.controller';
import { ChatgptService } from './chatgpt.service';

export { ChatgptController, ChatgptService };

@Module({
  imports: [ConfigModule],
  controllers: [ChatgptController],
  providers: [ChatgptService],
})
export class ChatgptModule {}
