import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DTOCustomerEntityImpl } from '@react-node-monorepo/application';

@Entity({})
export class DBModelCustomerEntity extends DTOCustomerEntityImpl {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column()
  public name: string;
  @Column()
  public email;
  @Column()
  public dateCreated: Date;
  @Column()
  public dateModified: Date;
}
