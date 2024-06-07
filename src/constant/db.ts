export const DB = {
  DATABASE_NAME: process.env.MYSQL_DATABASE,
} as const;

export const options = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: DB.DATABASE_NAME,
  charset: 'utf8mb4',
};
