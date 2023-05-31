import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Password01',
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: ['src/database/models/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);
