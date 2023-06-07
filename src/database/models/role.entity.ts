import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { TransientEntity } from './shared/transient-entity';
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  updatedBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  deletedBy: User;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
