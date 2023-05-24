import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommissionType } from './ComissionType.entity';

@Entity()
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => CommissionType, (type) => type.id)
  @JoinColumn()
  type: CommissionType;

  @Column()
  imageSrc: string;

  @Column()
  price: number;

  @Column({ type: 'bigint' })
  createdTime: number;
}
