import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path:process.env.NODE_ENV == 'production'?'.env.prod':".env.dev" });

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host:process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //entities in compiled version are in .js extension,so you need to include.js
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  subscribers: [join(__dirname, '..', 'subscribers', '*.{ts,js}')],
  synchronize: true,
  migrationsRun: true,
};

export default registerAs('typeorm', () => databaseConfig);
export const connectionSource = new DataSource(
  databaseConfig as DataSourceOptions,
);
