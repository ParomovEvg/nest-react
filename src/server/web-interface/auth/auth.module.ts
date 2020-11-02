import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserStorageModule } from '../../modules/user-storage/user-storage.module';
import { CreateUserUseCase } from '../../../domain/ports/in/auth/create-user.use-case/create-user.use-case';
import { CreateUserService } from '../../../domain/services/auth/create-user.service';
import { UserStorageAdapter } from '../../modules/user-storage/user-storage.adapter';
import { GetAllUsersQuery } from '../../../domain/ports/in/auth/get-all-users.query/get-all-users.query';
import { GetAllUsersService } from '../../../domain/services/auth/get-all-users.service';
import { AuthMapper } from './auth.mapper';

@Module({
  imports: [UserStorageModule],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: userStorage => new CreateUserService(userStorage, userStorage, userStorage),
      inject: [UserStorageAdapter],
    },
    {
      provide: GetAllUsersQuery,
      useFactory: userStorage => new GetAllUsersService(userStorage),
      inject: [UserStorageAdapter],
    },
    AuthMapper
  ],
  controllers: [AuthController],
})
export class AuthModule {}
