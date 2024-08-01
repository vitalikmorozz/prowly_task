import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [CoreModule, ContactsModule, AddressesModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
