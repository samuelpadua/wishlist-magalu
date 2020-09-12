'use strict'

import Hapi from '@hapi/hapi'
import Routes from '../utils/routes'

async function init () {
  const server = Hapi.server({
    port: 6000,
    host: 'localhost'
  })

  server.route(Routes)

  return server
}

export default {
  init
}
