import { ICreateContact } from '@app/core/models/contact.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';

export class ContactRepositoryService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  public async getOne(id: string): Promise<ContactEntity | null> {
    if (!id) {
      return null;
    }

    return await this.contactRepository.findOne({ where: { id } });
  }

  public async createOne(createDto: ICreateContact): Promise<ContactEntity> {
    const entity = new ContactEntity();

    entity.firstName = createDto.firstName;
    entity.lastName = createDto.lastName;
    entity.age = createDto.age;
    entity.email = createDto.email;

    return await this.contactRepository.save(entity);
  }

  public async createMany(createDtos: ICreateContact[]): Promise<ContactEntity[]> {
    const response: ContactEntity[] = [];

    for (const createDto of createDtos) {
      const savedData = await this.createOne(createDto);
      response.push(savedData);
    }

    return response;
  }
}
