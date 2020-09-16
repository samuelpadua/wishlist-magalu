import handlers from './handlers'
import validator from './validators'

export default [
  {
    method: 'POST',
    path: '/api/auth',
    handler: handlers.auth,
    config: {
      auth: false,
      description: 'Generate token jwt to authenticate an user',
      tags: ['api', 'customer', 'auth'],
      validate: validator.auth
    }
  }
]
