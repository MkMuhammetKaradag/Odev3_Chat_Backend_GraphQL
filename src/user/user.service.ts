import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
const Users: User[] = [];
@Injectable()
export class UserService {
  async getUser(userName: string) {
    const user = Users.find((user) => user.userName === userName);
    if (!user) {
      throw new HttpException('user not found ', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async createUser(userName: string) {
    const user = Users.find((user) => user.userName === userName);
    if (user) {
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    } else {
      Users.push({ userName, messages: [] });
      return { userName, messages: [] };
    }
  }
}
