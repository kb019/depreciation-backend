import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host:
    process.env.NODE_ENV == 'production'
      ? process.env.DB_HOST
      : process.env.DB_DEVHOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username:
    process.env.NODE_ENV == 'production'
      ? process.env.DB_USER
      : process.env.DB_DEV_USER,
  password:
    process.env.NODE_ENV == 'production'
      ? process.env.DB_PASSWORD
      : process.env.DB_DEV_PASSWORD,
  database:
    process.env.NODE_ENV == 'production'
      ? process.env.DB_NAME
      : process.env.DB_DEV_NAME,
  //entities in compiled version are in .js extension,so you need to include.js
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  subscribers: [join(__dirname, '..', 'subscribers', '*.{ts,js}')],
  synchronize: false,
  migrationsRun: false,
};

export default registerAs('typeorm', () => databaseConfig);
export const connectionSource = new DataSource(
  databaseConfig as DataSourceOptions,
);
