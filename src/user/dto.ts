import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class createUserDto {
  @IsString()
  @Field()
  userName: string;
}
