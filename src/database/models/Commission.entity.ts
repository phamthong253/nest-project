import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransientEntity } from './shared/transient-entity';
import { CommissionType } from './commission-type.entity';
import { User } from './user.entity';

@Entity()
export class Commission extends TransientEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => CommissionType, (type) => type.id)
  @JoinColumn()
  type: CommissionType;

  @Column({ type: 'text' })
  imageSrc: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.id)
  ownedBy: User;

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
