import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver()
export class UserResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    private readonly userService: UserService,
  ) {}

  @Query((returns) => User)
  async getUser(@Args('userName', { type: () => String }) userName: string) {
    return this.userService.getUser(userName);
  }

  @Mutation(() => User)
  async createUser(@Args('userName', { type: () => String }) userName: string) {
    return this.userService.createUser(userName);
  }
}
