import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto, ResponseAddressDto } from './addresses.dto';
import { Observable } from 'rxjs';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @Post()
  createOne(@Body(ValidationPipe) createDto: CreateAddressDto): Observable<ResponseAddressDto> {
    return this.addressesService.createOne(createDto);
  }
}
