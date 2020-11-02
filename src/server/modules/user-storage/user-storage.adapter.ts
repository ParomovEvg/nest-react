import { Injectable } from '@nestjs/common';
import { LoadUserByNamePort } from '../../../domain/ports/out/user/load-user-by-name.port';
import { LoadUserByEmailPort } from '../../../domain/ports/out/user/load-user-by-email.port';
import { SaveNewUserPort } from '../../../domain/ports/out/user/save-new-user.port';
import { Either, left, right } from 'useful-monads';
import { NotFound } from '../../../domain/error/NotFound';
import { User } from '../../../domain/entities/user/user';
import { UserMapper } from './user/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { Repository } from 'typeorm';
import { LoadAllUsersPort } from '../../../domain/ports/out/user/load-all-users.port';

@Injectable()
export class UserStorageAdapter
  implements LoadUserByNamePort, LoadUserByEmailPort, SaveNewUserPort, LoadAllUsersPort {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private userMapper: UserMapper,
  ) {}

  async loadUserByEmail(userEmail: string): Promise<Either<NotFound, User>> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (user) {
      return right(this.userMapper.mapToDomain(user));
    } else {
      return left(new NotFound('user not found by email'));
    }
  }

  async loadUserByName(userName: string): Promise<Either<NotFound, User>> {
    const user = await this.userRepository.findOne({ where: { name: userName } });
    if (user) {
      return right(this.userMapper.mapToDomain(user));
    } else {
      return left(new NotFound('user not found by name'));
    }
  }

  async saveNewUser(user: User): Promise<void> {
    const dto = this.userMapper.mapToOrm(user);
    if (!dto.id) {
      this.userRepository.save(dto);
    }
  }

  loadUsers(): Promise<User[]> {
    return this.userRepository.find().then(r => r.map(this.userMapper.mapToDomain));
  }
}
