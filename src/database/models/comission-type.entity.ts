import { Column, Entity } from 'typeorm';
import { TransientEntity } from './shared/transient-entity.entity';

@Entity()
export class CommissionType extends TransientEntity {
  @Column()
  name: string;
}
