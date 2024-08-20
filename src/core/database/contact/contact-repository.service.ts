import { ICreateContact } from '@app/core/models/contact.model';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';

export class ContactRepositoryService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) { }

  public async getOne(id: string): Promise<ContactEntity | null> {
    if (!id) {
      return null;
    }

    return await this.contactRepository.findOne({ where: { id }, relations: { addresses: true } });
  }

  public async createOne(createDto: ICreateContact): Promise<ContactEntity> {
    const entity = new ContactEntity();

    entity.firstName = createDto.firstName;
    entity.lastName = createDto.lastName;
    entity.age = createDto.age;
    entity.email = createDto.email;
    entity.phone = createDto.phone;

    return await this.contactRepository.save(entity);
  }

  public async createMany(createDtos: ICreateContact[]): Promise<ContactEntity[]> {
    const batchSize = 10000;

    return await this.contactRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const response: ContactEntity[] = [];

        for (let i = 0; i < createDtos.length; i += batchSize) {
          const batch = createDtos.slice(i, i + batchSize);
          const entities = batch.map((createDto) => this.contactRepository.create(createDto));

          const savedBatch = await entityManager.save(ContactEntity, entities);
          response.push(...savedBatch);
        }

        return response;
      },
    );
  }
}
