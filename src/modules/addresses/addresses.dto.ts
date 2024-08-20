import { IAddress, ICreateAddress } from '@app/core/models/address.model';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { ResponseContactDto } from '../contacts/contacts.dto';

export class CreateAddressDto implements ICreateAddress {
    @IsString() city: string;
    @IsString() street: string;
    @IsString() contactId: string;
}

export class ResponseAddressDto implements IAddress {
    id: string;
    city: string;
    street: string;
    contact?: ResponseContactDto;

    @Exclude() createdDate: Date;
    @Exclude() updatedDate: Date;

    constructor(entity: IAddress) {
        Object.assign(this, entity);
        this.contact = entity.contact ? new ResponseContactDto(entity.contact) : undefined;
    }
}
