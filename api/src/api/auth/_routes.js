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
  },
  {
    method: 'GET',
    path: '/api/auth/me',
    handler: handlers.me,
    config: {
      description: 'Return logged user',
      tags: ['api', 'customer', 'auth']
    }
  }
]
