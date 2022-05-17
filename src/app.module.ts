import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [CoreModule, ContactsModule, AddressesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
