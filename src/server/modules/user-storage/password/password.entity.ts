import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PasswordDto } from '../../../../domain/entities/user/password/password.dto';

@Entity()
export class PasswordEntity implements PasswordDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashedPassword: string;

  @ManyToOne(type => UserEntity)
  user?: UserEntity;
}
