import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { TransientEntity } from './shared/transient-entity';
import { Role } from './role.entity';

@Entity()
export class User extends TransientEntity {
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 400 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
