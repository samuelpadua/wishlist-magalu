'use strict'

import Server from './config/server'

const init = async () => {
  const server = await Server.init()

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
