import 'dotenv/config';

export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
};
