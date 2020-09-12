'use strict'

import Path from 'path'
import { Sequelize } from 'sequelize'

import Config from './environment'

const env = process.env.NODE_ENV || 'development'
const basePath = Path.normalize(Path.join(__dirname, '/../../'))

const sequelize = new Sequelize('sqlite::memory:', {
  storage: `${basePath}/${Config.databases.sqlite[env].storage}`,
  logging: false
})

export default sequelize
