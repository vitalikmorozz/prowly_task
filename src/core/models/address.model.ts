import { IBase } from './base.model';

export interface ICreateAddress {
  city: string;
  street: string;
}

export interface IAddress extends IBase {
  city: string;
  street: string;
}
