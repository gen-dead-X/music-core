import 'dotenv/config';

export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
};
