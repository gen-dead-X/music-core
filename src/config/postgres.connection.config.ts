import { Client } from 'pg';
import config from './config';

const client = new Client({
  user: 'postgres',
  host: config.HOST || 'localhost',
  database: config.DATABASE_NAME || 'postgres',
  password: config.DATABASE_PASSWORD || 'postgres',
  port: 5432,
});

export default function connectToPostgres() {
  try {
    client.connect();
    console.log('Connected To Postgres! ✅');
  } catch (error) {
    console.log(error);
  }
}
