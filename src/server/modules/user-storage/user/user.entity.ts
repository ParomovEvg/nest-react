import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordEntity } from '../password/password.entity';
import { UserDto } from '../../../../domain/entities/user/user.dto';

@Entity()
export class UserEntity implements UserDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(
    type => PasswordEntity,
    object => object.user,
  )
  passwords?: PasswordEntity[];
}
