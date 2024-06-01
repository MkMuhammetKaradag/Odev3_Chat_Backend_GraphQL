import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Chat } from './chat.model';
import { promises } from 'dns';
import { createChatDto } from './dto';

const Chats: Chat[] = [];
@Injectable()
export class ChatService {
  constructor() {}

  async getChat(id: number) {
    const chat = Chats.find((chat) => chat.id === id);
    if (!chat) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    } else {
      return chat;
    }
  }

  async getChats() {
    return Chats;
  }

  async createChat(data: createChatDto) {
    const isChat = Chats.findIndex(
      (chat) => chat.chatName === data.chatName.trim(),
    );
    if (isChat !== -1) {
      throw new HttpException('Chat already exists', HttpStatus.BAD_REQUEST);
    } else {
      const chat = {
        chatName: data.chatName.trim(),
        id: Chats.length + 1,
        messages: [],
      };

      Chats.push(chat);

      return chat;
    }
  }
}
