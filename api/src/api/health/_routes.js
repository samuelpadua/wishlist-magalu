import Handlers from './handlers'

export default [
  {
    method: 'GET',
    path: '/api/health/check',
    handler: Handlers.check,
    config: {
      auth: false,
      description: 'App is running',
      tags: ['api', 'health-check']
    }
  },
  {
    method: 'GET',
    path: '/api/health/database',
    handler: Handlers.database,
    config: {
      auth: false,
      description: 'Database connect test',
      tags: ['api', 'health-check', 'database']
    }
  }
]
