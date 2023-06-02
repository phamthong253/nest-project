import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { TransientEntity } from './shared/transient-entity.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Role extends TransientEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
