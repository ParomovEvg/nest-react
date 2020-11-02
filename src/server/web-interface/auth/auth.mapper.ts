import { Injectable } from '@nestjs/common';
import { GetAllUsersRes } from '../../../shared/dto/auth/GetAllUsersRes';
import { User } from '../../../domain/entities/user/user';

@Injectable()
export class AuthMapper {
  getAllUsersRes(users: User[]): GetAllUsersRes {
    return users
      .map(user => user.getDto())
      .map(userDto => ({ email: userDto.email, name: userDto.name }));
  }
}
