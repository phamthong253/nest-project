import { Column, Entity } from 'typeorm';
import { BaseEntity } from './shared/base-entity';

@Entity()
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;
}
