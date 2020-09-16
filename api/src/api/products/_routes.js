import handlers from './handlers'
import validators from './validators'

export default [
  {
    method: 'GET',
    path: '/api/products',
    handler: handlers.list,
    config: {
      auth: false,
      description: 'List products',
      tags: ['api', 'products'],
      validate: validators.list
    }
  }
]
