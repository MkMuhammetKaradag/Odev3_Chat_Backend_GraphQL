import { Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { MessagesService } from './messages.service';
import { Message } from './message.model';
import { createChatDto } from 'src/chat/dto';
import { createMessageDto } from './dto';
const CREATE_MESSAGE_EVENT = 'createMessageSub';
@Resolver()
export class MessagesResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    private readonly messagesService: MessagesService,
  ) {}
  @Query((returns) => Message)
  async message(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.getMessage(id);
  }

  @Query((returns) => [Message])
  async messages(@Args('chatId', { type: () => Int }) chatId: number) {
    return this.messagesService.getMessages(chatId);
  }

  @Mutation(() => Message)
  async createMessage(@Args('input') createMessageInput: createMessageDto) {
    const message =
      await this.messagesService.createMessage(createMessageInput);
    this.pubSub.publish(CREATE_MESSAGE_EVENT, { createMessageSub: message });

    return message;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => {
      return payload.createMessageSub.chatId === variables.chatId;
    },
  })
  createMessageSub(@Args('chatId', { type: () => Int }) chatId: number) {
    return this.pubSub.asyncIterator(CREATE_MESSAGE_EVENT);
  }
}
