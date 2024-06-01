import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/messages/message.model';

@ObjectType()
export class User {
  @Field()
  userName: string;

  @Field((type) => [Message], { nullable: 'items' })
  messages: Message[];
}
