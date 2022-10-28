import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../model/user.entity';
import { UserMatchBet } from '../model/userMatchBet.entity';
import { UserTeamBet } from 'src/model/userTeamBet.entity';

config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
} = process.env;

export default new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: [User, UserMatchBet, UserTeamBet],
  migrations: ['src/migrations/*.ts'],
} as DataSourceOptions);
