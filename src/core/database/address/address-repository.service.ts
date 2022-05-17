import { Injectable } from '@nestjs/common';

import { ICreateAddress } from '@core/models/address.model';
import { AddressEntity } from './address.entity';

@Injectable()
export class AddressRepositoryService {
  public async createOne(createDto: ICreateAddress): Promise<AddressEntity> {
    // TODO Implement
    throw Error('Method not implemented');
  }
}
