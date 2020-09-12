'use strict'

import klawSync from 'klaw-sync'
import Path from 'path'

function findRoutes () {
  const basePath = Path.normalize(Path.join(__dirname, '/../'))

  return klawSync(basePath)
    .filter(item => item.path.endsWith('_routes.js'))
    .reduce((prev, route) => {
      const routes = prev.concat(require(route.path).default)

      return routes
    }, [])
}

const routes = findRoutes()

export default routes
