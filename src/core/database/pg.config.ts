import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPgConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: parseInt(config.get('POSTGRES_PORT') ?? '5432', 10),
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DB'),
  entities:
    config.get('ENVIRONMENT') === 'test' ? ['**/*.entity.ts'] : ['dist/src/**/*.entity.{ts,js}'],
  synchronize: true,
  keepConnectionAlive: true,
});
