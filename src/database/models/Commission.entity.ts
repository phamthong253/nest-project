import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransientEntity } from './shared/transient-entity.entity';
import { CommissionType } from './comission-type.entity';

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
