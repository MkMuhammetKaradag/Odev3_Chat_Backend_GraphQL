import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatResolver]
})
export class ChatModule {}
