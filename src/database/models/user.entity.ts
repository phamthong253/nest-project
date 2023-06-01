import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 400, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
