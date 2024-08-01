import { IAddress } from '@core/models/address.model';
import { CommonBaseEntity } from '../common.baseEntity';

// TODO Implement Entity
export class AddressEntity extends CommonBaseEntity implements IAddress {
  city: string;
  street: string;
}
