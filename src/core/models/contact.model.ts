import { ResponseAddressDto } from '@app/modules/addresses/addresses.dto';
import { IBase } from './base.model';

export interface ICreateContact {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
}

export interface IContact extends IBase {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  addresses: ResponseAddressDto[];
}
