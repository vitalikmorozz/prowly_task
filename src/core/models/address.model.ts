import { ResponseContactDto } from '@app/modules/contacts/contacts.dto';
import { IBase } from './base.model';

export interface ICreateAddress {
  city: string;
  street: string;
  contactId: string;
}

export interface IAddress extends IBase {
  city: string;
  street: string;
  contact?: ResponseContactDto;
}
