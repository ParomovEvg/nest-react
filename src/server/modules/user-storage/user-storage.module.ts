import { Module } from '@nestjs/common';
import { UserStorageAdapter } from './user-storage.adapter';
import { PasswordMapper } from './password/password.mapper';
import { UserMapper } from './user/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from './password/password.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity, UserEntity])],
  providers: [UserStorageAdapter, PasswordMapper, UserMapper],
  exports: [UserStorageAdapter],
})
export class UserStorageModule {}
