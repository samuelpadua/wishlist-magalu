import httpStatus from 'http-status'

import * as customerService from '../services/customer.service'

export default async function (request, h) {
  const result = await customerService.find({
    id: request.params.id
  })

  return h.response(result).code(httpStatus.OK)
}
