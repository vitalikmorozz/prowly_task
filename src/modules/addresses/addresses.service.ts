import { DatabaseService } from '@app/core/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // TODO Implement create one address method
}
