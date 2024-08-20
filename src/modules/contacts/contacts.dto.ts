import { IContact, ICreateContact } from '@app/core/models/contact.model';
import { Exclude } from 'class-transformer';
import { IsEmail, IsInt, IsPhoneNumber, IsString } from 'class-validator';
import { ResponseAddressDto } from '../addresses/addresses.dto';

export class CreateContactDto implements ICreateContact {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsInt() age: number;
  @IsString() @IsEmail() email: string;
  @IsString() @IsPhoneNumber() phone: string;
}

export class ResponseContactDto implements IContact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  addresses: ResponseAddressDto[];

  @Exclude() createdDate: Date;
  @Exclude() updatedDate: Date;

  constructor(entity: IContact) {
    Object.assign(this, entity);
    this.addresses = entity.addresses?.map(a => new ResponseAddressDto(a)) || [];
  }
}
