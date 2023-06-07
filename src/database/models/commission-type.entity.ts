import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransientEntity } from './shared/transient-entity';
import { User } from './user.entity';

@Entity()
export class CommissionType extends TransientEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  updatedBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  deletedBy: User;
}
