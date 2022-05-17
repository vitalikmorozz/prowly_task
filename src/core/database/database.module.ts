import { AddressRepositoryService } from '@database/address/address-repository.service';
import { ContactRepositoryService } from '@database/contact/contact-repository.service';
import { ContactEntity } from '@database/contact/contact.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import * as ormConfig from 'config/ormConfig';
import * as ormConfigTest from 'config/ormConfigTest';
import { DatabaseService } from './database.service';

const env = config.get('environment');

@Module({
  imports: [
    TypeOrmModule.forRoot(env === 'test' ? ormConfigTest : ormConfig),
    TypeOrmModule.forFeature([ContactEntity]),
  ],
  providers: [DatabaseService, ContactRepositoryService, AddressRepositoryService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
