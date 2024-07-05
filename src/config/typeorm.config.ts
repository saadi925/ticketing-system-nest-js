import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { entities } from "src/schema";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Saadsaad1',
  database: 'newcrm',
  entities,
  synchronize: true, // set to false in production
};
