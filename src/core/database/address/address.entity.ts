import { IAddress } from '@core/models/address.model';
import { CommonBaseEntity } from '../common.baseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ContactEntity } from '../contact/contact.entity';

@Entity()
export class AddressEntity extends CommonBaseEntity implements IAddress {
  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  street: string;

  @ManyToOne(() => ContactEntity, (contact) => contact.addresses)
  contact: ContactEntity;
}
