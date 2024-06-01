import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class createMessageDto {
  @IsString()
  @Field()
  text: string;

  @IsString()
  @Field()
  userName: string;

  @Field((type) => Int)
  chatId: number;
}
