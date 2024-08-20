import { Injectable } from '@nestjs/common';

import { ICreateAddress } from '@core/models/address.model';
import { AddressEntity } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../contact/contact.entity';

@Injectable()
export class AddressRepositoryService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) { }

  public async createOne(createDto: ICreateAddress): Promise<AddressEntity> {
    const entity = new AddressEntity();

    const contact = await this.contactRepository.findOneBy({ id: createDto.contactId })

    entity.city = createDto.city;
    entity.street = createDto.street;
    entity.contact = contact!;

    return await this.addressRepository.save(entity)
  }
}
