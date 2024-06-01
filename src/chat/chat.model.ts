import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/messages/message.model';

@ObjectType()
export class Chat {
  @Field((type) => Int)
  id: number;

  @Field()
  chatName: String;

  @Field((type) => [Message], { nullable: 'items' })
  messages: Message[];
}
