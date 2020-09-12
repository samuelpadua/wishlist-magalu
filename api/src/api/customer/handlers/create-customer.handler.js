import httpStatus from 'http-status'

import * as customerService from '../../../modules/customer/service/customer.service'

export default async function (request, h) {
  try {
    const result = await customerService.create(request.payload)

    return h.response(result).code(httpStatus.CREATED)
  } catch (error) {
    if (error.message) {
      return h.response({
        message: error.message
      }).code(httpStatus.BAD_REQUEST)
    }
  }
}
