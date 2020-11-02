import { Injectable } from '@nestjs/common';
import { EntityMapper } from '../../types/EntityMapper';
import { PasswordEntity } from './password.entity';
import { Password } from '../../../../domain/entities/user/password/password';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PasswordMapper implements EntityMapper<PasswordEntity, Password> {
  mapToDomain(ormEntity: PasswordEntity): Password {
    return new Password(ormEntity);
  }

  mapToOrm(domainEntity: Password): PasswordEntity {
    const dto = domainEntity.getDto();
    return plainToClass(PasswordEntity, dto);
  }
}
