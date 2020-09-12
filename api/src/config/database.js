'use strict'

import Path from 'path'

import { Sequelize } from 'sequelize'

const basePath = Path.normalize(Path.join(__dirname, '/../../'))

const sequelize = new Sequelize('sqlite::memory:', {
  storage: `${basePath}/database/database.sqlite`,
  logging: false
})

export default sequelize
