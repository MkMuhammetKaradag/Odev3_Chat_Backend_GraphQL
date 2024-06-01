import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './message.model';
import { createMessageDto } from './dto';
const Messages: Message[] = [];
@Injectable()
export class MessagesService {
  async getMessage(id: number) {
    const message = Messages.find((message) => message.id === id);
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    } else {
      return message;
    }
  }

  async getMessages(chatId: number) {
    const messages = Messages.filter((message) => message.chatId === chatId);
    if (messages.length <= 0) {
      throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
    } else {
      return messages;
    }
  }

  async createMessage(input: createMessageDto) {
    try {
      const message = {
        ...input,
        id: Messages.length + 1,
      };
      Messages.push(message);
      return message;
    } catch (error) {
      throw new HttpException('Message bad reques', HttpStatus.BAD_REQUEST);
    }
  }
}
