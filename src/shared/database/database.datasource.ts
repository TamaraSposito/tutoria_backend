import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { MainSeeder } from '@shared/database/seeds/main.seeder';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import process from "process";
dotenv.config();

const localOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: '127.0.0.1', //process.env.TYPEORM_HOST,
  port: Number(3306),//Number(process.env.TYPEORM_PORT),
  username: 'root', //process.env.TYPEORM_USER,
  password: 'mauFJcuf5dhRMQrjj', //process.env.TYPEORM_SECRET,
  database: 'tutoring', //process.env.TYPEORM_DATABASE,
  entities: [join(__dirname, '..', '..', '/**/*/model/*.model{.ts,.js}')],
  migrations: [join(__dirname, '..', '..', '/migrations/{.ts,*.js}')],
  seeds: [MainSeeder],
};
function getConfig() {
  return new DataSource(localOptions);
}

export const databaseDatasource = getConfig();

