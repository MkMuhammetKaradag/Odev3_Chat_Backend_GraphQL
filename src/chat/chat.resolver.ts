import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { createChatDto } from './dto';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../pub-sub/pub-sub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
const CREATE_CHAT_EVENT = 'createChats';
@Resolver()
export class ChatResolver {
  constructor(
    private chatService: ChatService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Query((returns) => Chat)
  async chat(@Args('id', { type: () => Int }) id: number) {
    return this.chatService.getChat(id);
  }

  @Query((returns) => [Chat])
  async chats() {
    return this.chatService.getChats();
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => Chat)
  async createChat(@Args('input') createChatInput: createChatDto) {
    const chat = await this.chatService.createChat(createChatInput);

    this.pubSub.publish(CREATE_CHAT_EVENT, { createChats: chat });
    return chat;
  }

  @Subscription(() => Chat)
  createChats() {
    const data = this.pubSub.asyncIterator(CREATE_CHAT_EVENT);
    return data;
  }
}
