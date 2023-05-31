import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommissionType } from './ComissionType.entity';

@Entity()
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => CommissionType, (type) => type.id)
  @JoinColumn()
  type: CommissionType;

  @Column({ type: 'text' })
  imageSrc: string;

  @Column()
  price: number;

  @Column({ type: 'bigint' })
  createdTime: number;
}
