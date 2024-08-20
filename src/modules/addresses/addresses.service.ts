import { DatabaseService } from '@app/core/database/database.service';
import { ICreateAddress } from '@app/core/models/address.model';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseAddressDto } from './addresses.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly databaseService: DatabaseService) { }

  public createOne(createDto: ICreateAddress): Observable<ResponseAddressDto> {
    return this.databaseService
      .addressesCreateOne(createDto)
      .pipe(map((entity) => new ResponseAddressDto(entity)));
  }
}
