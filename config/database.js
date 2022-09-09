const DB_OPTIONS = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  pool: {
    min: 0,
    max: 5,
    acquire: 10000,
    idle: 10000
  }
};

module.exports = DB_OPTIONS;
