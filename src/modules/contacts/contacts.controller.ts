import { Body, Controller, Get, Param, ParseArrayPipe, Post, ValidationPipe } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CreateContactDto, ResponseContactDto } from './contacts.dto';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Get(':contactId')
  getOne(@Param('contactId') contactId: string): Observable<ResponseContactDto> {
    return this.contactsService.getOne(contactId);
  }

  @Post('many')
  createMany(
    @Body(new ParseArrayPipe({ items: CreateContactDto }))
    createDtos: CreateContactDto[],
  ): Observable<string[]> {
    return this.contactsService.createMany(createDtos).pipe(map(cs => cs.map(c => c.id)));
  }

  @Post()
  createOne(@Body(ValidationPipe) createDto: CreateContactDto): Observable<ResponseContactDto> {
    return this.contactsService.createOne(createDto);
  }
}
