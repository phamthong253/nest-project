import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransientEntity } from './shared/transient-entity';
import { CommissionType } from './commission-type.entity';

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
}
