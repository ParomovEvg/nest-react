import { Injectable } from '@nestjs/common';
import { EntityMapper } from '../../types/EntityMapper';
import { UserEntity } from './user.entity';
import { User } from '../../../../domain/entities/user/user';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserMapper implements EntityMapper<UserEntity, User> {
  mapToDomain(ormEntity: UserEntity): User {
    return new User({
      ...ormEntity,
    });
  }

  mapToOrm(domainEntity: User): UserEntity {
    return plainToClass(UserEntity, domainEntity.getDto());
  }
}
