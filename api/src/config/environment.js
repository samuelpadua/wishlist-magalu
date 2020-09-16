export default {
  apis: {
    challenge: {
      baseUrl: 'http://challenge-api.luizalabs.com'
    }
  },
  databases: {
    sqlite: {
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
  }
}
