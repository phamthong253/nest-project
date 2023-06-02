import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

@Entity()
export class TransientEntity extends BaseEntity {
  @Column({ type: 'bigint', nullable: true, default: Date.now() })
  createTime: number;

  @Column({ type: 'bigint', nullable: true, default: Date.now() })
  updateTime: number;

  @Column({ type: 'bigint', nullable: true })
  deleteTime: number;
}
