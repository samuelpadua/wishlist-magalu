import httpStatus from 'http-status'

import * as customerService from '../../customer/services/customer.service'

export default async function (request, h) {
  const { credentials } = request.auth

  const customer = await customerService.find({
    id: credentials.id,
    email: credentials.email
  })

  if (!customer.id) {
    h.response({
      message: 'Not authorized'
    }).code(httpStatus.UNAUTHORIZED)
  }

  return h.response(customer).code(httpStatus.OK)
}
