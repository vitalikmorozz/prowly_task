# **Installation**

### 1. Install Node.js

### 2. Install Postgres and create new database

You can use `docker-compose up -d` to install it

### 3. Configure .env with your environments

# **Recruitment task**

run `npm test`

## 1. Contact entity

- Validate user "email" input ✔️
- Add "phoneNumber" field to Contact entity with validation ✔️
- Add test which check response message that given wrong email and wrong phone number was validated correctly ✔️

## 2. Address entity

- Implement Address entity ✔️
- Connect contact and address in one-to-many relation (One contact can have multiple addresses) ✔️
- Add new endpoint to save address with a contact (without validation IsString is enough) ✔️
- Contacts should be downloaded with their addresses ✔️
- Add test which tests new endpoint ✔️
- Update test which download contact to check if address was correctly connected ✔️

## 3. Optimize create many contact endpoint

- Create test for create many endpoint with payload of minimum 50,000 contacts ✔️
- Optimize create many method to handle this query ✔️
