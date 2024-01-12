import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'music',
  password: 'balmerol',
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
