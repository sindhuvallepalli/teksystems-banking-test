module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'banking-dev',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'banking-test',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL'
  }
};
