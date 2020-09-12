module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'databases/db.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: 'databases/db_test.sqlite'
  },
  production: {
    dialect: 'sqlite',
    storage: 'databases/db_production.sqlite'
  }
}
