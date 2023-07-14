import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { MainSeeder } from '@shared/database/seeds/main.seeder';
import * as process from 'process';
import * as fs from 'fs';

export const ConfigDatabase = () =>  {
  const local = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USER,
    password: process.env.TYPEORM_SECRET,
    database: process.env.TYPEORM_DATABASE,
    entities: [join(__dirname, '..', '..', '/**/*/model/*.model{.ts,.js}')],
    migrations: [join(__dirname, '..', '..', '/migrations/{.ts,*.js}')],
    seeds: [MainSeeder],
    logging: false,
    synchronize: false,
    migrationsRun: true,
  } as TypeOrmModuleOptions;

  if (process.env.ENVIRONMENT == 'local') return local;

  const cloud = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USER,
    password: process.env.TYPEORM_SECRET,
    database: process.env.TYPEORM_DATABASE,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(
          join(__dirname, '..', '..', '..', '/ca-certificate.crt'),
      ),
    },
    entities: [join(__dirname, '..', '..', '/**/*/model/*.model{.ts,.js}')],
    migrations: [join(__dirname, '..', '..', '/migrations/{.ts,*.js}')],
    seeds: [MainSeeder],
    logging: false,
    synchronize: false,
    migrationsRun: true,
  } as TypeOrmModuleOptions;

  return cloud;
  }
