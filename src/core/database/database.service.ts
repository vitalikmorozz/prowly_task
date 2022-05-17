import { AddressRepositoryService } from '@database/address/address-repository.service';
import { IAddress } from '@core/models/address.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICreateAddress } from '../models/address.model';
import { IContact, ICreateContact } from '../models/contact.model';
import { ContactRepositoryService } from './contact/contact-repository.service';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly contactRepository: ContactRepositoryService,
    private readonly addressRepository: AddressRepositoryService,
  ) {}

  public contactsGetOne(id: string): Observable<IContact> {
    return from(this.contactRepository.getOne(id)).pipe(
      map((entity) => {
        if (!entity)
          throw new NotFoundException(`Could not find contact by id ${id}`);
        return entity;
      }),
    );
  }

  public contactsCreateOne(createDto: ICreateContact): Observable<IContact> {
    return from(this.contactRepository.createOne(createDto));
  }

  public contactsCreateMany(
    createDtos: ICreateContact[],
  ): Observable<IContact[]> {
    return from(this.contactRepository.createMany(createDtos));
  }

  public addressesCreateOne(createDto: ICreateAddress): Observable<IAddress> {
    return from(this.addressRepository.createOne(createDto));
  }
}
