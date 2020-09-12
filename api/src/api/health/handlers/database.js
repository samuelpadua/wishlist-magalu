import HTTPStatus from 'http-status'
import sequelize from '../../../config/database'

export default async function (request, h) {
  await sequelize.authenticate()

  return h.response({
    message: 'Connection has been established successfully.'
  }).code(HTTPStatus.OK)
}
