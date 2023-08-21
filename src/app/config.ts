import dotenv from 'dotenv';

dotenv.config();

export default {
  APP_PORT: process.env.APP_PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: +(process.env.MYSQL_PORT ?? 3006),
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE
};
