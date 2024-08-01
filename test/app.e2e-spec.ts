import { ContactRepositoryService } from '@database/contact/contact-repository.service';
import { ICreateContact } from '@app/core/models/contact.model';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';

const CONTACT: ICreateContact = {
  firstName: 'first',
  lastName: 'last',
  age: 55,
  email: 'bad.email',
};

describe('App e2e', () => {
  let app: INestApplication;
  let contactDatabaseService: ContactRepositoryService;
  let contactId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    contactDatabaseService = moduleFixture.get(ContactRepositoryService);
  });

  it('should create by /contacts (POST)', (done) => {
    request(app.getHttpServer())
      .post('/contacts/')
      .send(CONTACT)
      .expect((response) => {
        const { body, status } = response;
        contactId = body.id;

        expect(body).toEqual({ ...CONTACT, id: expect.any(String) });
        expect(status).toEqual(201);
      })
      .end(done);
  });

  it('should get by /contacts/:id (GET)', (done) => {
    request(app.getHttpServer())
      .get(`/contacts/${contactId || ''}`)
      .expect((response) => {
        const { body, status } = response;

        expect(body).toEqual({ ...CONTACT, id: contactId });
        expect(status).toEqual(200);
      })
      .end(done);
  });

  afterAll(async () => {
    await contactDatabaseService['contactRepository'].delete({});
    await app.close();
  });
});
