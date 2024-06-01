import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class createChatDto {
  @IsString()
  @Field()
  chatName: string;
}
