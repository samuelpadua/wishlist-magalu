import Server from './server'

const initServer = async () => {
  global.server = await Server.init()
}

initServer()
