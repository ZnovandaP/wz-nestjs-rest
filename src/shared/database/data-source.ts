import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize:
    process.env.DB_SYNCHRONIZE.toLowerCase() === 'true' ? true : false,
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/schema/migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOption);

export default dataSource;
