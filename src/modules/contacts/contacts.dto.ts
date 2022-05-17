import { IContact, ICreateContact } from '@app/core/models/contact.model';
import { Exclude } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateContactDto implements ICreateContact {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsInt() age: number;
  @IsString() email: string;
}

export class ResponseContactDto implements IContact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;

  @Exclude() createdDate: Date;
  @Exclude() updatedDate: Date;

  constructor(entity: IContact) {
    Object.assign(this, entity);
  }
}
