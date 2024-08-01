import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressRepositoryService } from './address/address-repository.service';
import { ContactRepositoryService } from './contact/contact-repository.service';

import { DatabaseService } from './database.service';

import { ContactEntity } from './contact/contact.entity';

import { getPgConfig } from './pg.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => getPgConfig(config),
    }),
    TypeOrmModule.forFeature([ContactEntity]),
  ],
  providers: [DatabaseService, ContactRepositoryService, AddressRepositoryService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
