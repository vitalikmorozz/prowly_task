import { applyMiddlewares } from '@app/app.middlewares';
import { AppModule } from '@app/app.module';
import { AddressRepositoryService } from '@app/core/database/address/address-repository.service';
import { ICreateAddress } from '@app/core/models/address.model';
import { ICreateContact } from '@app/core/models/contact.model';
import { ResponseContactDto } from '@app/modules/contacts/contacts.dto';
import { ContactRepositoryService } from '@database/contact/contact-repository.service';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

const CONTACT: ICreateContact = {
  firstName: 'first',
  lastName: 'last',
  age: 55,
  email: 'bad.email@test.com',
  phone: '+48123123123'
};

const WRONG_CONTACT: ICreateContact = {
  firstName: 'first',
  lastName: 'last',
  age: 55,
  email: 'bad.email',
  phone: '+48123123',
};

const ADDRESS: ICreateAddress = {
  city: 'City name',
  street: 'Some street 12',
  contactId: '',
}

describe('App e2e', () => {
  let app: INestApplication;
  let contactDatabaseService: ContactRepositoryService;
  let addressDatabaseService: AddressRepositoryService;
  let contactId: string;
  let addressId: string;
  let contact: ResponseContactDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    applyMiddlewares(app);

    await app.init();
    contactDatabaseService = moduleFixture.get(ContactRepositoryService);
    addressDatabaseService = moduleFixture.get(AddressRepositoryService);
  });

  it('/contacts (POST) should error if the contact input is wrong', (done) => {
    request(app.getHttpServer())
      .post('/contacts/')
      .send(WRONG_CONTACT)
      .expect((response) => {
        const { body, status } = response;

        expect(body.message).toContain("email must be an email");
        expect(body.message).toContain("phone must be a valid phone number");

        expect(status).toEqual(400);
      })
      .end(done);
  });

  it('/contacts (POST) should create contact', (done) => {
    request(app.getHttpServer())
      .post('/contacts/')
      .send(CONTACT)
      .expect((response) => {
        const { body, status } = response;
        contactId = body.id;
        contact = body;

        expect(body).toEqual({
          ...CONTACT,
          id: expect.any(String),
          addresses: []
        });
        expect(status).toEqual(201);
      })
      .end(done);
  });

  it('/contacts/:id (GET) should return contact', (done) => {
    request(app.getHttpServer())
      .get(`/contacts/${contactId || ''}`)
      .expect((response) => {
        const { body, status } = response;

        expect(body).toEqual({
          ...CONTACT,
          id: contactId,
          addresses: []
        });
        expect(status).toEqual(200);
      })
      .end(done);
  });

  it('/addresses (POST) should create address', (done) => {
    ADDRESS.contactId = contactId;

    request(app.getHttpServer())
      .post('/addresses/')
      .send(ADDRESS)
      .expect((response) => {
        const { body, status } = response;
        addressId = body.id;

        expect(body).toEqual({
          id: expect.any(String),
          city: ADDRESS.city,
          street: ADDRESS.street,
          contact
        });
        expect(status).toEqual(201);
      })
      .end(done);
  });

  it('/contacts/:id (GET) should return contacts with addresses', (done) => {
    request(app.getHttpServer())
      .get(`/contacts/${contactId || ''}`)
      .expect((response) => {
        const { body, status } = response;

        expect(body).toEqual({
          ...CONTACT,
          id: contactId,
          addresses: [{
            id: addressId,
            city: ADDRESS.city,
            street: ADDRESS.street,
          }]
        });
        expect(status).toEqual(200);
      })
      .end(done);
  });

  it('/contacts/many (POST) should create 50000 contacts', (done) => {
    const count = 50_000;
    const contacts = new Array(count).fill(0).map(_ => CONTACT);

    request(app.getHttpServer())
      .post('/contacts/many')
      .send(contacts)
      .expect((response) => {
        const { body, status } = response;

        expect(body).toHaveLength(count)
        expect(status).toEqual(201);
      })
      .end(done);
  });

  afterAll(async () => {
    await addressDatabaseService['addressRepository'].delete({});
    await contactDatabaseService['contactRepository'].delete({});
    await app.close();
  });
});
