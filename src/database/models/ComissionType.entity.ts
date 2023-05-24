import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommissionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
