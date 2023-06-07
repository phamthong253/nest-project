import { Column, Entity } from 'typeorm';
import { TransientEntity } from './shared/transient-entity';

@Entity()
export class CommissionType extends TransientEntity {
  @Column()
  name: string;
}
