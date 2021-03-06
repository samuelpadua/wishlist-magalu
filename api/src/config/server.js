'use strict'

import Hapi from '@hapi/hapi'
import Routes from '../utils/routes'
import AuthJWT from 'hapi-auth-jwt2'

import { validate } from '../api/auth/services/auth.service'
import numeralSetLocale from '../utils/numeral'

async function init () {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: true
    }
  })

  await server.register(AuthJWT)
  server.auth.strategy('jwt', 'jwt', {
    key: 'some_jwt_secret', // Never Share your secret key
    validate
  })

  server.route(Routes)

  server.auth.default('jwt')

  numeralSetLocale()

  return server
}

export default {
  init
}
