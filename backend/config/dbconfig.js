const config = {
  server: process.env.SQL_SERVER,
  port: 1433,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  connectionTimeout: 150000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

module.exports = config;
