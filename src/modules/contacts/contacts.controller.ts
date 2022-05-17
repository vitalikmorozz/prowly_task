import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateContactDto, ResponseContactDto } from './contacts.dto';
import { ContactsService } from './contacts.service';

@Controller('contacts')
@UseInterceptors(ClassSerializerInterceptor)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':contactId')
  getOne(
    @Param('contactId') contactId: string,
  ): Observable<ResponseContactDto> {
    return this.contactsService.getOne(contactId);
  }

  @Post('many')
  createMany(
    @Body(new ParseArrayPipe({ items: CreateContactDto }))
    createDtos: CreateContactDto[],
  ): Observable<ResponseContactDto[]> {
    return this.contactsService.createMany(createDtos);
  }

  @Post()
  createOne(
    @Body(ValidationPipe) createDto: CreateContactDto,
  ): Observable<ResponseContactDto> {
    return this.contactsService.createOne(createDto);
  }
}