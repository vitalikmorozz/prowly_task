import { DatabaseService } from '@app/core/database/database.service';
import { ICreateContact } from '@app/core/models/contact.model';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseContactDto } from './contacts.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}

  public getOne(id: string): Observable<ResponseContactDto> {
    return this.databaseService
      .contactsGetOne(id)
      .pipe(map((entity) => new ResponseContactDto(entity)));
  }

  public createOne(createDto: ICreateContact): Observable<ResponseContactDto> {
    return this.databaseService
      .contactsCreateOne(createDto)
      .pipe(map((entity) => new ResponseContactDto(entity)));
  }

  public createMany(createDtos: ICreateContact[]): Observable<ResponseContactDto[]> {
    return this.databaseService
      .contactsCreateMany(createDtos)
      .pipe(map((entities) => entities.map((entity) => new ResponseContactDto(entity))));
  }
}
