import { Body, Controller, Get, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserCommand } from '../../../domain/ports/in/auth/create-user.use-case/create-user.command';
import { CreateUserUseCase } from '../../../domain/ports/in/auth/create-user.use-case/create-user.use-case';
import { GetAllUsersQuery } from '../../../domain/ports/in/auth/get-all-users.query/get-all-users.query';
import { GetAllUsersRes } from '../../../shared/dto/auth/GetAllUsersRes';
import { CreateAccountReq } from '../../../shared/dto/auth/CreateAccountReq';
import { AuthMapper } from './auth.mapper';

@Controller('api/auth')
export class AuthController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersQuery: GetAllUsersQuery,
    private authMapper: AuthMapper,
  ) {}

  @Get()
  async getUsers(): Promise<GetAllUsersRes> {
    const users = await this.getAllUsersQuery.getUsers();
    return this.authMapper.getAllUsersRes(users);
  }

  @Post()
  createUser(@Body() body: CreateAccountReq) {
    const command = plainToClass(CreateUserCommand, body);
    return this.createUserUseCase.createUser(command);
  }
}
