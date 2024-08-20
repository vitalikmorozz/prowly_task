import { IContact } from '@app/core/models/contact.model';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonBaseEntity } from '../common.baseEntity';
import { AddressEntity } from '../address/address.entity';

@Entity()
export class ContactEntity extends CommonBaseEntity implements IContact {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToMany(_ => AddressEntity, address => address.contact)
  addresses: AddressEntity[];
}
