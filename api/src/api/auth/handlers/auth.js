import httpStatus from 'http-status'

import * as AuthService from '../services/auth.service'

export default async function (request, h) {
  try {
    const { email } = request.payload

    const token = await AuthService.generateToken(email)

    return h.response({
      token
    }).code(httpStatus.OK)
  } catch (error) {
    if (error.message) {
      return h.response({
        message: error.message
      }).code(httpStatus.UNAUTHORIZED)
    }
  }
}
